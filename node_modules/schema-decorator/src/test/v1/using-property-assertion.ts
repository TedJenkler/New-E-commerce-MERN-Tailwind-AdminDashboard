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
const foo = new Foo();

console.log(foo.value); //Prints "Hello"

foo.value = "World"; //OK
try {
    foo.value = (3 as any);          //Run-time Error
} catch (err) {
    console.log(err.message);
}
try {
    foo.value = (true as any);       //Run-time Error
} catch (err) {
    console.log(err.message);
}
try {
    foo.value = (new Date() as any); //Run-time Error
} catch (err) {
    console.log(err.message);
}

//console.log(foo["____hijacked-by-schema-decorator-value"]);          //Transpile-time Error
console.log((foo as any)["____hijacked-by-schema-decorator-value"]); //OK

console.log(Object.keys(foo)) //Prints `["value"]`
