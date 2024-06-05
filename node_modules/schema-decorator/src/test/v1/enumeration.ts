import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename, (t) => {
    enum A {
        x,
        y,
        z
    }
    const a = sd.enumeration(A);

    t.deepEquals(a("x", A.x), A.x);
    t.deepEquals(a("y", A.y), A.y);
    t.deepEquals(a("z", A.z), A.z);

    t.deepEquals(a("x", 0), A.x);
    t.deepEquals(a("y", 1), A.y);
    t.deepEquals(a("z", 2), A.z);

    try {
        a("X", "X");
        t.fail("X");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("x", "x");
        t.fail("x");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("y", "y");
        t.fail("y");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("z", "z");
        t.fail("z");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("-1", -1);
        t.fail("-1");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});

tape(__filename + "-key", (t) => {
    enum A {
        x,
        y,
        z
    }
    const a = sd.enumerationKey(A);

    t.deepEquals(a("x", "x"), "x");
    t.deepEquals(a("y", "y"), "y");
    t.deepEquals(a("z", "z"), "z");

    try {
        a("X", "X");
        t.fail("X");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("A.x", A.x);
        t.fail("A.x");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("A.y", A.y);
        t.fail("A.y");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("A.z", A.z);
        t.fail("A.z");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("-1", -1);
        t.fail("-1");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});

tape(__filename + "-string", (t) => {
    enum A {
        x = "f",
        y = "g",
        z = "h"
    }
    const a = sd.enumeration(A);

    t.deepEquals(a("x", A.x), "f");
    t.deepEquals(a("y", A.y), "g");
    t.deepEquals(a("z", A.z), "h");

    t.deepEquals(a("x", "f"), "f");
    t.deepEquals(a("y", "g"), "g");
    t.deepEquals(a("z", "h"), "h");

    try {
        a("X", "X");
        t.fail("X");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("x", "x");
        t.fail("x");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("y", "y");
        t.fail("y");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("z", "z");
        t.fail("z");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("-1", -1);
        t.fail("-1");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});

tape(__filename + "-string-key", (t) => {
    enum A {
        x = "f",
        y = "g",
        z = "h"
    }
    const a = sd.enumerationKey(A);

    t.deepEquals(a("x", "x"), "x");
    t.deepEquals(a("y", "y"), "y");
    t.deepEquals(a("z", "z"), "z");

    try {
        a("F", "F");
        t.fail("F");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("f", "f");
        t.fail("f");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("g", "g");
        t.fail("g");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("h", "h");
        t.fail("h");
    } catch (err) {
        t.pass(err.message);
    }

    try {
        a("-1", -1);
        t.fail("-1");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});