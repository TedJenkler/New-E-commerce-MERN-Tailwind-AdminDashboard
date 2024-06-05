# THIS PACKAGE IS NOW DEPRECATED

Use [`type-mapping`](https://github.com/anyhowstep/type-mapping) instead.

-----

# `schema-decorator`

Security for web apps is important. User input should never be trusted.
Validation and sanitization can be laborous, and mistakes can slip by easily.

Responses from API endpoints should also never be trusted; changes may roll out
and quietly cause calling code to break (e.g. fields are removed/added/changed).

# Goals

We must validate/sanitize the following,

+ Route parameters
  (e.g. Validate that `id` is a natural number in `GET /posts/${id}`)
+ Query strings
  (e.g. Validate that `before` is a date in `GET /posts?before=${before}`)
+ JSON bodies
  (e.g. Validate that `title` is a non-empty string in `POST /posts`)
+ JSON responses
  (e.g. Validate that `title` is a non-empty string in `GET /posts/${id}`)

We may also do the following,

+ Validate data from "schemaless" databases.
  If a developer accidentally introduces invalid data directly, this can
  be caught if you use `schema-decorator` to check the type during run-time.

# Installation

`npm install --save schema-decorator`

# Usage

(TODO, update examples)

See `api.ts/basic-array.ts/basic.ts/built-in.ts/inheritance.ts/nested.ts` in `./src/test/`
for more examples.

## AssertDelegate<>

An `AssertDelegate<>` (`types.ts`) is the most basic kind of assertion.

It is a function with the signature `(name : string, mixed : unknown) => T`.

`name` is the name of the field or object being asserted.

`mixed` is the `unknown` value we are asserting.

```ts
import * as sd from "schema-decorator";
//OK, 34
const x = sd.naturalNumber()("x", 34);
//OK during compile time, Error during run time
const y = sd.naturalNumber()("y", 34.5);
//OK during compile time, Error during run time
const z = sd.naturalNumber()("z", "34");
```

## `TypeOf<>`

`TypeOf<>` is a helper type to get the type of an `AssertDelegate<>`.

```ts
import * as sd from "schema-decorator";
const evenNumber = (name : string, mixed : unknown) => {
    if (typeof mixed != "number") {
        throw new Error(`Expected ${name} to be a number`);
    }
    if (mixed % 2 == 0) {
        return mixed;
    } else {
        throw new Error(`Expected ${name} to be an even number`);
    }
};
type n = sd.TypeOf<typeof evenNumber>; //number
```

This may seem trivial at the moment but grows more useful when
your `AssertDelegate<>` starts checking complex objects.

## `sd.check<>()`

The following example shows one limitation of `AssertDelegate<>`,

```ts
import * as sd from "schema-decorator";
//OK during compile time, Error during run time
const z = sd.naturalNumber()("z", "34");
```

It would be nice if we can get a compile time error when passing a string
to the `AssertDelegate<>`

This is possible with `sd.check<>()`,

```ts
import * as sd from "schema-decorator";
//Error during compile time
//Argument of type '"34"' is not assignable to parameter of type 'number'.
const z = sd.check(sd.naturalNumber(), "z", "34");
```

For values where you cannot possibly know the value (3rd party API, user input, schema-less database query),
calling the `AssertDelegate<>` directly is useful.

For values where you want to sanity check the type, `sd.check<>()` is preferable.

## `__accepts` and `AcceptsOf<>`

An `AssertDelegate<>` can have a "meta field" named `__accepts`.

The type of `__accepts` will tell you what types the `AssertDelegate<>` accepts.

In general, the `__accepts` meta field, if it exists,
will be the same as the return type of the `AssertDelegate<>`.

If the `AssertDelegate<>` does not have the `__accepts` meta field,
it is assumed it accepts its return type.

---

`AcceptsOf<>` is a helper type that will give you the type the `AssertDelegate<>`
accepts.

`sd.check<>()` uses `AcceptsOf<>` to give the compiler error.

`__accepts` and `AcceptsOf<>` are not directly used, in general,
but can be useful for library writers,
who wish to leverage `schema-decorator`.

## `__canAccept` and `CanAcceptOf<>`

An `AssertDelegate<>` can have a "meta field" named `__canAccept`.

The type of `__canAccept` will tell you what types the `AssertDelegate<>`
*can* accept; but may not necessarily want to accept.

If the `AssertDelegate<>` does not have the `__canAccept` meta field,
it is assumed to be the same as `AcceptsOf<>`.

---

`CanAcceptOf<>` is a helper type that will give you the type the
`AssertDelegate<>` *can* accept.

`__canAccept` and `CanAcceptOf<>` are not directly used, in general,
but can be useful for library writers,
who wish to leverage `schema-decorator`.

---

An example of `__canAccept` being used is `sd.stringToNaturalNumber()`,
the declaration looks like,

```ts
export declare function stringToNaturalNumber () : (
    AssertDelegate<number> &
    {
        __accepts: number;
        __canAccept: string | number;
    }
);
```

We can see that `stringToNaturalNumber()` *can* accept `string`, but
chooses to accept only `number`.

The rationale is that, if you're passing `string` to an
`AssertDelegate<>` that returns `number`, you're probably
doing something questionable.

So, while `sd.check(sd.stringToNaturalNumber(), "x", "34")` will
give a compile time error (`"34"` is not assignable to `number`),
the `AssertDelegate<>` can still handle `string`.

```ts
import * as sd from "schema-decorator";
//OK
const x = sd.stringToNaturalNumber()("x", 34);
//OK, this `AssertDelegate<>()` can convert strings to natural number
const y = sd.stringToNaturalNumber()("y", "34");
//OK during compile time, Error during run time; not a natural number string
const z = sd.stringToNaturalNumber()("z", "hello, world!");
```

```ts
import * as sd from "schema-decorator";
//OK
const x = sd.check(sd.stringToNaturalNumber(), "x", 34);
//Compile time error, `"34"` is not assignable to `number`
const y = sd.check(sd.stringToNaturalNumber(), "y", "34");
//Compile time error, `"hello, world!"` is not assignable to `number`
const z = sd.check(sd.stringToNaturalNumber(), "z", "hello, world!");
```

## `relaxed<>()` and `strict<>()`

What if you're *sure* that you want `sd.stringToNaturalNumber()` to
accept `string`?

This is possible with `relaxed<>()`,

```ts
import * as sd from "schema-decorator";
//OK
const x = sd.check(sd.relaxed(sd.stringToNaturalNumber()), "x", 34);
//OK, this `AssertDelegate<>()` can convert strings to natural number
const y = sd.check(sd.relaxed(sd.stringToNaturalNumber()), "y", "34");
//OK during compile time, Error during run time
const z = sd.check(sd.relaxed(sd.stringToNaturalNumber()), "z", "hello, world!");
```

`relaxed<>()` makes the `__accepts` of an `AssertDelegate<>` the same as its
`__canAccept`; it relaxes the types accepted.

`strict<>()` makes the `__accepts` of an `AssertDelegate<>` the same as its
`TypeOf<>`; it becomes strict with the types accepted.

## `AssertFunc<>`, `toAssertDelegateExact<>()`

`AssertFunc<>` is a type that encompasses all types that can be used by
`schema-decorator` to assert `unknown` values.

These are the valid kinds of `AssertFunc<>`,

+ `AssertDelegate<>`
+ `Field<>` (Will be discussed later)
+ `Constructor<T> = {new():T}` (Deprecated)

`toAssertDelegateExact<>()` is a helper function used to convert an
`AssertFunc<>` into `AssertDelegate<>`.

You should not need to call this explicitly, in general.
This is useful for library writers.

## `Field<>`, `field<>()`, `fields<>()`

A `Field<>` contains a `name` and `AssertFunc<>`.

```ts
const fieldX = new sd.Field("x", sd.naturalNumber());
//OK
const x0 = fieldX.assertType(34);
//OK during compile time; Error during run time
//Expected "x" to be a natural number, received string
const x1 = fieldX.assertType("34");
```

`field<>()` is a helper method to create a `Field<>`,

```ts
const fieldX = sd.field("x", sd.naturalNumber());
//OK
const x0 = fieldX.assertType(34);
//OK during compile time; Error during run time
//Expected "x" to be a natural number, received string
const x1 = fieldX.assertType("34");
```

`fields<>()` is a helper method to create multiple `Field<>` instances,

```ts
const fields = sd.fields({
    x : sd.naturalNumber(),
    y : sd.stringToNaturalNumber(),
});
//OK
const x = fields.x.assertType(34);
//OK, can convert to number
const y = fields.y.assertType("34");
```

The rationale for having `Field<>` is that every layer of your application
will have a different idea of what a resource may look like.

+ The database layer can see the entire resource. (All fields)
+ The admin layer can see most, if not the entirety, of a resource. (Most fields)
+ The app client layer can see a lot of a resource. (Many fields)
+ The user layer should not see sensitive info., and may have restricted access to certain fields (Some fields)

However, if a field is present, they generally have the same type assertion
required.

Instead of duplicating field checks for every layer, `Field<>`s can be
instantiated in one file and re-used across all layers.

`Field<>`s are also the building blocks of asserting more complex objects.

## `schema<>()`

`schema<>()` is used to create object assertions out of `Field<>` instances,

```ts
const resource = sd.fields({
    id : sd.stringToNaturalNumber(),
    superSensitiveInfo : sd.string(),
    publiclyAvailableInfo : sd.string(),
});

//In another file
const resourceForApp = sd.schema(
    resource.id,
    resource.superSensitiveInfo,
    resource.publiclyAvailableInfo
);
//In yet another file
const resourceForUser = sd.schema(
    resource.id,
    resource.publiclyAvailableInfo
);
```

`resourceForApp` will be used for the app client layer.

`resourceForUser` will be used for the user layer, ensuring your user
will not see sensitive information.

## `array<>()`

`array<>()` is used to assert that the value is an array,

```ts
//OK
const arr0 = sd.array(sd.naturalNumber())("arr0", [1, 2, 3, 4]);
//OK
const arr1 = sd.array(sd.string())("arr1", ["hello", "world"]);
//OK during compile time, Error during run time
const arr2 = sd.array(sd.string())("arr2", [1, 2, 3]);
```

## Property Assertions (Deprecated)

Asserting fields of a `class` isn't really recommended, anymore.

However, if you must, you may use the `@assert()` decorator on properties of classes.

## Creating Assertions

An `AssertDelegate<>` looks like,

```
export type AssertDelegate<T> = (name : string, mixed : any) => T;
```

As long as your function fits that shape, you have an assert delegate.

An `AssertDelegate` should:

1. Return the unmodified `mixed` if it is the right data type
1. Throw an error with `name`, and relevant descriptive information otherwise

It is  generally *bad behaviour* to modify `mixed` and return it or return something else entirely. (There are exceptions, though.)

-----

One of the few exceptions is `array<>()` which creates an `AssertDelegate<T[]>` from `AssertFunc<T>`.

If at least one element returned by `AssertFunc<T>` is not the original element,
the whole array is copied and an array with the new elements is returned.

If an `AssertDelegate<>` returns a result that is not the original `mixed`, it is generally considered *bad behaviour*.

The original array is never modified.

## Creating Casters

`cast<>()` creates an `AssertDelegate<>` that does the following.

1. If `mixed` is the desired data type, return it.
1. If we cannot cast `mixed` to the desired data type, throw an error.
1. Cast `mixed` into the desired data type.
1. If the casted value is the desired data type, return it.
1. If not, throw an error.

Notice that this is possibly returning a value that is not `mixed`.

This is sometimes necessary, especially for `Date`.

While `Date` is an object in Javascript/TypeScript, it gets serialized into a
date-`string` over JSON.

To allow such cases where the serialized data type does not match the
desired data type, we allow casting.

Examples of `cast<>()` may be found in `basic.ts`.

`date()` returns an `AssertDelegate<>` that converts `string|number` to `Date`,
and checks that they are valid dates.

## Deprecations

+ `@assert()`
+ `toClass<>()`
+ `toRaw()`
+ `Constructor<T> = {new():T}`

Use `fields<>(), schema<>(), check<>()` instead.

Then, to get the type, use `TypeOf<>` on the `AssertFunc<>`

## API

You don't *have* to use this to make your API requests. You could use just the
property assertions or converters in your code to make it more secure.

This part just provides a starting point for how you could possibly code
a REST client.

The following executes a `GET /posts/1` on <https://jsonplaceholder.typicode.com>

```ts
import * as sd from "schema-decorator";

const param = sd.toSchema({
    id : sd.naturalNumber()
});
const response = sd.toSchema({
    userId : sd.naturalNumber(),
    id : sd.naturalNumber(),
    title : sd.string(),
    body : sd.string()
});

const domain = "https://jsonplaceholder.typicode.com";
const Api = sd.toApi({
    fetch : sd.Route.Create()
        .append("/posts")
        .appendParam("id", /\d+/)
        .param(param)
        .response(response)
});
const api = new Api({
    domain : domain,
});
await api.fetch()
    .setParam({
        id : 1
    })
    .send()
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
```

Look at `./src/test/api.ts` for an executable example.

# Non-Goals

The following are non-goals:

+ Using reflection (for now)
+ Efficiency

  While it isn't ridiculously slow, it isn't the fastest code in the world.
  There *is* overhead in checking every data-type, for possibly deeply-nested hierarchies.
  There *is* overhead in creating all these anonymous functions.

  You may use the `any()/unknown()` `AssertDelegate<>` to remove type checks for certain fields, but you should be very careful and I do not recommend it.

# TODO

Update `./src/test` folder to phase out deprecations.

# Tests

You may run all tests with `npm run test-all`.

You may run individual tests with `npm run test ./src/test/api.ts`, replacing `api.ts` with any other test file name.

# License

Do what you want with this as long as you do no evil.
