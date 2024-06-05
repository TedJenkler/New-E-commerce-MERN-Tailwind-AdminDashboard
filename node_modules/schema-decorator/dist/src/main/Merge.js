"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=Merge.js.map