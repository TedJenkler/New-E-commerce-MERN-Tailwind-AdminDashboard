import * as sd from "schema-decorator";
import * as validation from "@anyhowstep/data-validation";
import * as schemaExpress from "../main/index";
import * as express from "express";
import * as http from "http";

const parameter = sd.toSchema({
    id : sd.stringToNaturalNumber(),
})
class Body {
    @sd.assert(validation.Number.assertNaturalNumber)
    userId : number = 1;
    @sd.assert(validation.String.assertNonEmpty)
    title : string = "-";
    @sd.assert(validation.String.assertNonEmpty)
    body : string = "-";
}
class Title {
    @sd.assert(validation.String.assertNonEmpty)
    title : string = "-";
}
class Response {
    @sd.assert(validation.Number.assertNaturalNumber)
    userId : number = 1;
    @sd.assert(validation.Number.assertNaturalNumber)
    id : number = 1;
    @sd.assert(validation.String.assertNonEmpty)
    title : string = "-";
    @sd.assert(validation.String.assertNonEmpty)
    body : string = "-";
}
class Comment {
    @sd.assert(validation.Number.assertNaturalNumber)
    postId : number = 1;
    @sd.assert(validation.Number.assertNaturalNumber)
    id : number = 1;
    @sd.assert(validation.String.assertNonEmpty)
    name : string = "-";
    @sd.assert(validation.String.assertEmail)
    email : string = "-@-";
    @sd.assert(validation.String.assertNonEmpty)
    body : string = "-";
}
class CommentQuery {
    @sd.assert(sd.stringToNaturalNumber())
    postId : number = 1;
}

const fetchPost = sd.Route.Create()
    .append("/posts")
    .appendParam("id", /\d+/)
    .param(parameter)
    .response(Response);

const app = new schemaExpress.App()
    .use<{ fromApp : true }>((_req, _res, next) => {
        next(undefined, {
            fromApp : true,
        })
    })
    .useVoid(express.json());

const r = app.createRouter();
r.add(fetchPost)
    .handler<{ title : string, body : string }>((_req, _res, next) => {
        //Middleware can now be typed
        next(undefined, {
            title : "Hello",
            body : "Lorem ipsum",
        });
    })
    .asyncJsonHandler((req, res) => {
        //Responses are typed, too.
        //Statically, and during run time.
        return {
            userId : 1,
            id : req.params.id,
            title : res.locals.title,
            body : res.locals.body,
        };
    })
    .build();

const fetchAllPosts = sd.Route.Create()
    .append("/posts")
    .response(sd.array(sd.nested(Response)));

r.add(fetchAllPosts)
    .asyncJsonHandler(() => {
        const result : Response[] = [];
        for (let i=0; i<10; ++i) {
            result.push({
                userId : i,
                id : i,
                title : `This is title ${i}`,
                body : `This is body #${i}`,
            });
        }
        return result;
    })
    .build();

const createPost = sd.Route.Create()
    .append("/posts")
    .body(Body)
    .response(Response);

r.add(createPost)
    .asyncJsonHandler((req) => {
        return {
            userId : req.body.userId,
            id : Math.floor(Math.random() * 100),
            title : req.body.title,
            body : req.body.body,
        };
    })
    .build();

const del = sd.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(parameter)
        .method("DELETE");

r.add(del)
    .asyncJsonHandler(() => {
        return 204;
    })
    .build();

const updatePost = sd.Route.Create()
    .method("PUT")
    .append("/posts")
    .appendParam("id", /\d+/)
    .param(parameter)
    .body(Response)
    .response(Response);

r.add(updatePost)
    .asyncJsonHandler((req) => {
        return {
            userId : req.body.userId,
            id : req.body.id,
            title : req.body.title,
            body : req.body.body,
        };
    })
    .build();

const patch = sd.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(parameter)
        .body(Title)
        .response(Response)
        .method("PATCH");

r.add(patch)
    .asyncJsonHandler((req) => {
        return {
            userId : 1,
            id : req.params.id,
            title : req.body.title,
            body : "Some body",
        };
    })
    .build();

const getCommentsOfPost = sd.Route.Create()
    .append("/comments")
    .query(CommentQuery)
    .response(sd.array(sd.nested(Comment)));

r.add(getCommentsOfPost)
    .asyncJsonHandler((req, res) => {
        const result : Comment[] = [];
        for (let i=0; i<10; ++i) {
            result.push({
                postId : req.query.postId,
                id : i,
                name : `Commenter #${i}`,
                email : `example+${i}@example.com`,
                body : `This is comment #${i}`,
            });
        }
        return result;
    })
    .build();

r.build(); //Or, app.useVoid(r.getRawRouter())

app.get("/test", (_req, res) => {
    res.json({
        Hello : "World",
        fromApp : res.locals.fromApp,
    });
});
app.useVoid((err : any, _req : express.Request, res : express.Response, next : express.NextFunction) => {
    if (err) {
        console.log(err);
        res.status(400).json({
            error : err.message,
        });
    } else {
        next();
    }
});
http.createServer(app.getRawApp()).listen(7777, () => {
    console.log("Test started");
});
