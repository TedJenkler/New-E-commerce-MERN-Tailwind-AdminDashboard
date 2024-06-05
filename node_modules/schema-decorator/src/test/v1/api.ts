import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";

const parameter = schema.toSchema({
    id : schema.stringToNaturalNumber()
});
class Body {
    @schema.assert(validation.Number.assertNaturalNumber)
    userId : number = 1;
    @schema.assert(validation.String.assertNonEmpty)
    title : string = "-";
    @schema.assert(validation.String.assertNonEmpty)
    body : string = "-";
}
class Title {
    @schema.assert(validation.String.assertNonEmpty)
    title : string = "-";
}
//https://github.com/typicode/jsonplaceholder/issues/60
//https://github.com/typicode/jsonplaceholder/issues/74
//https://github.com/typicode/jsonplaceholder/issues/88
class Response {
    @schema.assert(schema.maybe(schema.or(
        schema.naturalNumber(),
        schema.naturalNumberString()
    )))
    userId? : null|number|string;
    @schema.assert(schema.maybe(validation.Number.assertNaturalNumber))
    id? : null|number;
    @schema.assert(schema.maybe(validation.String.assertNonEmpty))
    title? : null|string;
    @schema.assert(schema.maybe(validation.String.assertNonEmpty))
    body? : null|string;
    @schema.assert(schema.any())
    headers? : any;
}
class Comment {
    @schema.assert(validation.Number.assertNaturalNumber)
    postId : number = 1;
    @schema.assert(validation.Number.assertNaturalNumber)
    id : number = 1;
    @schema.assert(validation.String.assertNonEmpty)
    name : string = "-";
    @schema.assert(validation.String.assertEmail)
    email : string = "-@-";
    @schema.assert(validation.String.assertNonEmpty)
    body : string = "-";
}
class CommentQuery {
    @schema.assert(validation.Number.assertNaturalNumber)
    postId : number = 1;
}

const domain = "https://jsonplaceholder.typicode.com";
const Api = schema.toApi({
    fetch : schema.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(parameter)
        .response(Response),
    fetchAll : schema.Route.Create()
        .append("/posts")
        .response(schema.array(schema.nested(Response))),
    insert : schema.Route.Create()
        .append("/posts")
        .body(Body)
        .response(Response),
    del : schema.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(parameter)
        .method("DELETE"),
    put : schema.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(parameter)
        .body(Response)
        .response(Response)
        .method("PUT"),
    patch : schema.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(parameter)
        .body(Title)
        .response(Response)
        .method("PATCH"),
    fetchComments : schema.Route.Create()
        .append("/comments")
        .query(CommentQuery)
        .response(schema.array(schema.nested(Comment))),
});
const api = new Api({
    domain : domain,
});

tape(__filename, async (t) => {
    await api.fetch()
        .setParam({
            id : 1
        })
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("fetch");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    await api.fetchAll()
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("fetchAll");
        })
        .catch((err) => {
            //console.error(err);
            throw err;
        });
    await api.insert()
        .setBody({
            userId : 1,
            title  : "My Title",
            body   : "My Body",
        })
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("insert");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    await api.del()
        .setParam({
            id : 1
        })
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("del");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
    await api.put()
        .setParam({
            id : 1
        })
        .setBody({
            id     : 1,
            userId : 2,
            title  : "test",
            body   : "test",
        })
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("put");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    await api.patch()
        .setParam({
            id : 1
        })
        .setBody({
            title  : "test",
        })
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("patch");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
    await api.fetchComments()
        .setQuery({
            postId : 1
        })
        .send()
        .then((_res) => {
            //console.log(res.data);
            t.pass("fetchComments");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
    t.end();
});

tape(__filename + "-string-to-number", async (t) => {
    await api.fetch()
        .setParam({
            //Notice how we're using a numeric-string
            id : "1" as any
        })
        .send()
        .then((res) => {
            t.deepEquals(res.data.id, 1);
            //console.log(res.data);
            t.pass("fetch");
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    t.end();
});