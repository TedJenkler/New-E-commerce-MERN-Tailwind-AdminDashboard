import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename, (t) => {
    enum A {
        x,
        y,
        z
    }
    const a = sd.toEnumeration(A);

    t.deepEquals(a("x", A.x), A.x);
    t.deepEquals(a("y", A.y), A.y);
    t.deepEquals(a("z", A.z), A.z);

    t.deepEquals(a("x", "x"), A.x);
    t.deepEquals(a("y", "y"), A.y);
    t.deepEquals(a("z", "z"), A.z);

    try {
        a("X", "X");
        t.fail("X");
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
    const a = sd.toEnumerationKey(A);

    t.deepEquals(a("x", A.x), "x");
    t.deepEquals(a("y", A.y), "y");
    t.deepEquals(a("z", A.z), "z");

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
    const a = sd.toEnumeration(A);

    t.deepEquals(a("x", A.x), "f");
    t.deepEquals(a("y", A.y), "g");
    t.deepEquals(a("z", A.z), "h");

    t.deepEquals(a("x", "x"), "f");
    t.deepEquals(a("y", "y"), "g");
    t.deepEquals(a("z", "z"), "h");

    try {
        a("X", "X");
        t.fail("X");
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
    const a = sd.toEnumerationKey(A);

    t.deepEquals(a("x", A.x), "x");
    t.deepEquals(a("y", A.y), "y");
    t.deepEquals(a("z", A.z), "z");

    t.deepEquals(a("x", "f"), "x");
    t.deepEquals(a("y", "g"), "y");
    t.deepEquals(a("z", "h"), "z");

    try {
        a("F", "F");
        t.fail("F");
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

tape(__filename + "-reflexive", (t) => {
    enum A {
        x = "x",
        y = "y",
        z = "z"
    }
    const a = sd.toEnumerationKey(A);

    t.deepEquals(a("x", A.x), "x");
    t.deepEquals(a("y", A.y), "y");
    t.deepEquals(a("z", A.z), "z");

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
        a("-1", -1);
        t.fail("-1");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});