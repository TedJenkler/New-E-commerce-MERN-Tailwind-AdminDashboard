//We can't use { [k in keyof T] : T[k] } directly because
//it does not distribute union types.
//However, Merge<T> will distribute union types.
export type Merge<T> = {
    [k in keyof T] : T[k]
};

/*
type u = (
    { a : number } &
    (
        { b : string } |
        { c : boolean }
    )
);
//Observe that the type is { a: number; }
type m = {
    [k in keyof u] : u[k]
};
//OK
const x : u = { a : 1, b : "hi" };
//Error
const y : m = { a : 1, b : "hi" };
//Error
const z : m = { a : 1, c : false };

type m2 = Merge<u>;
//OK
const x2 : u = { a : 1, b : "hi" };
//OK
const y2 : m2 = { a : 1, b : "hi" };
//OK
const z2 : m2 = { a : 1, c : false };
*/