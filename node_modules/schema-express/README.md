# `schema-router`

A wrapper for `express` that uses `schema-decorator`, and its `Route` class.

This allows you to,

1. Define `Route` in "route-only" package.
1. Share it between client, and server projects.

# TODO

Look into moving the `api` folder of `schema-decorator` to another package.

# Usage

```
import * as schema from "schema-decorator";
import * as schemaExpress from "../main/index";
import * as express from "express";
import * as http from "http";

class Parameter {
    @schema.assert(schema.stringToNaturalNumber())
    id : number = 1;
}
class Response {
    @schema.assert(schema.naturalNumber())
    userId : number = 1;
    @schema.assert(schema.naturalNumber())
    id : number = 1;
    @schema.assert(schema.string())
    title : string = "-";
    @schema.assert(schema.string())
    body : string = "-";
}

const fetch = schema.Route.Create()
    .append("/posts")
    .appendParam("id", /\d+/)
    .param(Parameter)
    .response(Response);

const app = new schemaExpress.App()
    .useVoid(express.json()); //So we can start parsing JSON

const router = app.createRouter();

router.add(fetch)
    .voidHandler((req, res) => {
        res.json({
            userId : 1,
            id     : req.params.id,
            title  : "A title",
            body   : "A body",
        });
    })
    .build();

router.build();

http.createServer(app.getRawApp()).listen(80, () => {
    console.log(`Started on port 80`)
});
```

The code is split into a few parts,

+ `App`

  Needed if you want to add type-safe middleware to `express()`

+ `Router`

  Needed if you want to add type-safe middleware to `express.Router()`

+ `RouteBuilder`

  Needed if you want to build routes with the `Route` instance from `schema-decorator`

+ `Handler`

  A middleware that modifies `res.locals`

+ `VoidHandler`

  A middleware that does not modify `res.locals`

# License

Do what you want with this as long as you do no evil.
