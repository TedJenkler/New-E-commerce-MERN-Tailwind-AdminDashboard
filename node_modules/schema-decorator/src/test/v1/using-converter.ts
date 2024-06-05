import * as schema from "../../main/index";
function isString (name : string, mixed : any) : string {
    if (typeof mixed == "string") {
        return mixed;
    } else {
        throw new Error(`Expected ${name} to be a string, received ${mixed}`);
    }
}
class Foo {
    @schema.assert(isString)
    value : string = "Hello";
}

//Using the same `Foo` above
try {
    schema.toClass("run-time error", {
        value : true
    }, Foo);
} catch (err) {
    console.log(err.message);
}
try {
    schema.toClass("run-time error", {
        value : 3
    }, Foo);
} catch (err) {
    console.log(err.message);
}
try {
    schema.toClass("run-time error", {
        value : new Date()
    }, Foo);
} catch (err) {
    console.log(err.message);
}
const a = schema.toClass("OK", {
    value : "true"
}, Foo);
console.log(a instanceof Foo); //Prints `true`
const b = schema.toClass("OK", {
    value : "3"
}, Foo);
console.log(b instanceof Foo); //Prints `true`

const bar = new Foo();
bar.value = "Hi";
const raw = schema.toRaw("OK", bar);
console.log(raw) //Prints `{ value : "Hi" }`
console.log(raw instanceof Foo); //Prints `false`
