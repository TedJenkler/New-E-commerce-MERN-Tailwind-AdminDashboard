import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-enumeration", (t) => {
    enum E {
        A,
        B,
        C
    }
    myUtil.test(t, sd.enumeration(E), E.A, E.A);
    myUtil.test(t, sd.enumeration(E), E.B, E.B);
    myUtil.test(t, sd.enumeration(E), E.C, E.C);
    myUtil.test(t, sd.enumeration(E), 0, E.A);
    myUtil.test(t, sd.enumeration(E), 1, E.B);
    myUtil.test(t, sd.enumeration(E), 2, E.C);

    myUtil.fail(t, sd.enumeration(E), 3);
    myUtil.fail(t, sd.enumeration(E), -1);
    myUtil.fail(t, sd.enumeration(E), "0");
    myUtil.fail(t, sd.enumeration(E), "1");
    myUtil.fail(t, sd.enumeration(E), "2");
    myUtil.fail(t, sd.enumeration(E), "3");
    myUtil.fail(t, sd.enumeration(E), "A");
    myUtil.fail(t, sd.enumeration(E), "B");
    myUtil.fail(t, sd.enumeration(E), "C");
    myUtil.fail(t, sd.enumeration(E), "D");
    myUtil.fail(t, sd.enumeration(E), true);
    myUtil.fail(t, sd.enumeration(E), false);
    myUtil.fail(t, sd.enumeration(E), []);

    t.end();
});

tape(__filename + "-enumeration-2", (t) => {
    enum E {
        A = "Airplane",
        B = "Bicycle",
        C = "Car"
    }
    myUtil.test(t, sd.enumeration(E), E.A, E.A);
    myUtil.test(t, sd.enumeration(E), E.B, E.B);
    myUtil.test(t, sd.enumeration(E), E.C, E.C);
    myUtil.fail(t, sd.enumeration(E), 0);
    myUtil.fail(t, sd.enumeration(E), 1);
    myUtil.fail(t, sd.enumeration(E), 2);

    myUtil.test(t, sd.enumeration(E), "Airplane", E.A);
    myUtil.test(t, sd.enumeration(E), "Bicycle", E.B);
    myUtil.test(t, sd.enumeration(E), "Car", E.C);

    myUtil.fail(t, sd.enumeration(E), 3);
    myUtil.fail(t, sd.enumeration(E), -1);
    myUtil.fail(t, sd.enumeration(E), "0");
    myUtil.fail(t, sd.enumeration(E), "1");
    myUtil.fail(t, sd.enumeration(E), "2");
    myUtil.fail(t, sd.enumeration(E), "3");
    myUtil.fail(t, sd.enumeration(E), "A");
    myUtil.fail(t, sd.enumeration(E), "B");
    myUtil.fail(t, sd.enumeration(E), "C");
    myUtil.fail(t, sd.enumeration(E), "D");
    myUtil.fail(t, sd.enumeration(E), true);
    myUtil.fail(t, sd.enumeration(E), false);
    myUtil.fail(t, sd.enumeration(E), []);

    t.end();
});

tape(__filename + "-enumeration-3", (t) => {
    enum E {
        A = "A",
        B = "B",
        C = "C"
    }
    myUtil.test(t, sd.enumeration(E), E.A, E.A);
    myUtil.test(t, sd.enumeration(E), E.B, E.B);
    myUtil.test(t, sd.enumeration(E), E.C, E.C);
    myUtil.fail(t, sd.enumeration(E), 0);
    myUtil.fail(t, sd.enumeration(E), 1);
    myUtil.fail(t, sd.enumeration(E), 2);

    myUtil.fail(t, sd.enumeration(E), "Airplane");
    myUtil.fail(t, sd.enumeration(E), "Bicycle");
    myUtil.fail(t, sd.enumeration(E), "Car");

    myUtil.fail(t, sd.enumeration(E), 3);
    myUtil.fail(t, sd.enumeration(E), -1);
    myUtil.fail(t, sd.enumeration(E), "0");
    myUtil.fail(t, sd.enumeration(E), "1");
    myUtil.fail(t, sd.enumeration(E), "2");
    myUtil.fail(t, sd.enumeration(E), "3");
    myUtil.test(t, sd.enumeration(E), "A", E.A);
    myUtil.test(t, sd.enumeration(E), "B", E.B);
    myUtil.test(t, sd.enumeration(E), "C", E.C);
    myUtil.fail(t, sd.enumeration(E), "D");
    myUtil.fail(t, sd.enumeration(E), true);
    myUtil.fail(t, sd.enumeration(E), false);
    myUtil.fail(t, sd.enumeration(E), []);

    t.end();
});

tape(__filename + "-enumeration-4", (t) => {
    enum E {
        A = "C",
        B = "A",
        C = "B"
    }
    myUtil.test(t, sd.enumeration(E), E.A, E.A);
    myUtil.test(t, sd.enumeration(E), E.B, E.B);
    myUtil.test(t, sd.enumeration(E), E.C, E.C);
    myUtil.fail(t, sd.enumeration(E), 0);
    myUtil.fail(t, sd.enumeration(E), 1);
    myUtil.fail(t, sd.enumeration(E), 2);

    myUtil.fail(t, sd.enumeration(E), "Airplane");
    myUtil.fail(t, sd.enumeration(E), "Bicycle");
    myUtil.fail(t, sd.enumeration(E), "Car");

    myUtil.fail(t, sd.enumeration(E), 3);
    myUtil.fail(t, sd.enumeration(E), -1);
    myUtil.fail(t, sd.enumeration(E), "0");
    myUtil.fail(t, sd.enumeration(E), "1");
    myUtil.fail(t, sd.enumeration(E), "2");
    myUtil.fail(t, sd.enumeration(E), "3");
    myUtil.test(t, sd.enumeration(E), "A", E.B);
    myUtil.test(t, sd.enumeration(E), "B", E.C);
    myUtil.test(t, sd.enumeration(E), "C", E.A);
    myUtil.fail(t, sd.enumeration(E), "D");
    myUtil.fail(t, sd.enumeration(E), true);
    myUtil.fail(t, sd.enumeration(E), false);
    myUtil.fail(t, sd.enumeration(E), []);

    t.end();
});

tape(__filename + "-enumeration-key", (t) => {
    enum E {
        A,
        B,
        C
    }
    myUtil.fail(t, sd.enumerationKey(E), E.A);
    myUtil.fail(t, sd.enumerationKey(E), E.B);
    myUtil.fail(t, sd.enumerationKey(E), E.C);
    myUtil.fail(t, sd.enumerationKey(E), 0);
    myUtil.fail(t, sd.enumerationKey(E), 1);
    myUtil.fail(t, sd.enumerationKey(E), 2);

    myUtil.fail(t, sd.enumerationKey(E), 3);
    myUtil.fail(t, sd.enumerationKey(E), -1);
    myUtil.fail(t, sd.enumerationKey(E), "0");
    myUtil.fail(t, sd.enumerationKey(E), "1");
    myUtil.fail(t, sd.enumerationKey(E), "2");
    myUtil.fail(t, sd.enumerationKey(E), "3");
    myUtil.test(t, sd.enumerationKey(E), "A", "A");
    myUtil.test(t, sd.enumerationKey(E), "B", "B");
    myUtil.test(t, sd.enumerationKey(E), "C", "C");
    myUtil.fail(t, sd.enumerationKey(E), "D");
    myUtil.fail(t, sd.enumerationKey(E), true);
    myUtil.fail(t, sd.enumerationKey(E), false);
    myUtil.fail(t, sd.enumerationKey(E), []);

    t.end();
});

tape(__filename + "-enumeration-key-2", (t) => {
    enum E {
        A = "Airplane",
        B = "Bicycle",
        C = "Car"
    }
    myUtil.fail(t, sd.enumerationKey(E), E.A);
    myUtil.fail(t, sd.enumerationKey(E), E.B);
    myUtil.fail(t, sd.enumerationKey(E), E.C);
    myUtil.fail(t, sd.enumerationKey(E), 0);
    myUtil.fail(t, sd.enumerationKey(E), 1);
    myUtil.fail(t, sd.enumerationKey(E), 2);

    myUtil.fail(t, sd.enumerationKey(E), "Airplane");
    myUtil.fail(t, sd.enumerationKey(E), "Bicycle");
    myUtil.fail(t, sd.enumerationKey(E), "Car");

    myUtil.fail(t, sd.enumerationKey(E), 3);
    myUtil.fail(t, sd.enumerationKey(E), -1);
    myUtil.fail(t, sd.enumerationKey(E), "0");
    myUtil.fail(t, sd.enumerationKey(E), "1");
    myUtil.fail(t, sd.enumerationKey(E), "2");
    myUtil.fail(t, sd.enumerationKey(E), "3");
    myUtil.test(t, sd.enumerationKey(E), "A", "A");
    myUtil.test(t, sd.enumerationKey(E), "B", "B");
    myUtil.test(t, sd.enumerationKey(E), "C", "C");
    myUtil.fail(t, sd.enumerationKey(E), "D");
    myUtil.fail(t, sd.enumerationKey(E), true);
    myUtil.fail(t, sd.enumerationKey(E), false);
    myUtil.fail(t, sd.enumerationKey(E), []);

    t.end();
});

tape(__filename + "-enumeration-key-3", (t) => {
    enum E {
        A = "A",
        B = "B",
        C = "C"
    }
    myUtil.test(t, sd.enumerationKey(E), E.A, "A");
    myUtil.test(t, sd.enumerationKey(E), E.B, "B");
    myUtil.test(t, sd.enumerationKey(E), E.C, "C");
    myUtil.fail(t, sd.enumerationKey(E), 0);
    myUtil.fail(t, sd.enumerationKey(E), 1);
    myUtil.fail(t, sd.enumerationKey(E), 2);

    myUtil.fail(t, sd.enumerationKey(E), "Airplane");
    myUtil.fail(t, sd.enumerationKey(E), "Bicycle");
    myUtil.fail(t, sd.enumerationKey(E), "Car");

    myUtil.fail(t, sd.enumerationKey(E), 3);
    myUtil.fail(t, sd.enumerationKey(E), -1);
    myUtil.fail(t, sd.enumerationKey(E), "0");
    myUtil.fail(t, sd.enumerationKey(E), "1");
    myUtil.fail(t, sd.enumerationKey(E), "2");
    myUtil.fail(t, sd.enumerationKey(E), "3");
    myUtil.test(t, sd.enumerationKey(E), "A", "A");
    myUtil.test(t, sd.enumerationKey(E), "B", "B");
    myUtil.test(t, sd.enumerationKey(E), "C", "C");
    myUtil.fail(t, sd.enumerationKey(E), "D");
    myUtil.fail(t, sd.enumerationKey(E), true);
    myUtil.fail(t, sd.enumerationKey(E), false);
    myUtil.fail(t, sd.enumerationKey(E), []);

    t.end();
});

tape(__filename + "-enumeration-key-4", (t) => {
    enum E {
        A = "C",
        B = "A",
        C = "B"
    }
    myUtil.test(t, sd.enumerationKey(E), E.A, "C");
    myUtil.test(t, sd.enumerationKey(E), E.B, "A");
    myUtil.test(t, sd.enumerationKey(E), E.C, "B");
    myUtil.fail(t, sd.enumerationKey(E), 0);
    myUtil.fail(t, sd.enumerationKey(E), 1);
    myUtil.fail(t, sd.enumerationKey(E), 2);

    myUtil.fail(t, sd.enumerationKey(E), "Airplane");
    myUtil.fail(t, sd.enumerationKey(E), "Bicycle");
    myUtil.fail(t, sd.enumerationKey(E), "Car");

    myUtil.fail(t, sd.enumerationKey(E), 3);
    myUtil.fail(t, sd.enumerationKey(E), -1);
    myUtil.fail(t, sd.enumerationKey(E), "0");
    myUtil.fail(t, sd.enumerationKey(E), "1");
    myUtil.fail(t, sd.enumerationKey(E), "2");
    myUtil.fail(t, sd.enumerationKey(E), "3");
    myUtil.test(t, sd.enumerationKey(E), "A", "A");
    myUtil.test(t, sd.enumerationKey(E), "B", "B");
    myUtil.test(t, sd.enumerationKey(E), "C", "C");
    myUtil.fail(t, sd.enumerationKey(E), "D");
    myUtil.fail(t, sd.enumerationKey(E), true);
    myUtil.fail(t, sd.enumerationKey(E), false);
    myUtil.fail(t, sd.enumerationKey(E), []);

    t.end();
});

tape(__filename + "-to-enumeration", (t) => {
    enum E {
        A,
        B,
        C
    }
    myUtil.test(t, sd.toEnumeration(E), E.A, E.A);
    myUtil.test(t, sd.toEnumeration(E), E.B, E.B);
    myUtil.test(t, sd.toEnumeration(E), E.C, E.C);
    myUtil.test(t, sd.toEnumeration(E), 0, E.A);
    myUtil.test(t, sd.toEnumeration(E), 1, E.B);
    myUtil.test(t, sd.toEnumeration(E), 2, E.C);

    myUtil.fail(t, sd.toEnumeration(E), 3);
    myUtil.fail(t, sd.toEnumeration(E), -1);
    myUtil.fail(t, sd.toEnumeration(E), "0");
    myUtil.fail(t, sd.toEnumeration(E), "1");
    myUtil.fail(t, sd.toEnumeration(E), "2");
    myUtil.fail(t, sd.toEnumeration(E), "3");
    myUtil.test(t, sd.toEnumeration(E), "A", E.A);
    myUtil.test(t, sd.toEnumeration(E), "B", E.B);
    myUtil.test(t, sd.toEnumeration(E), "C", E.C);
    myUtil.fail(t, sd.toEnumeration(E), "D");
    myUtil.fail(t, sd.toEnumeration(E), true);
    myUtil.fail(t, sd.toEnumeration(E), false);
    myUtil.fail(t, sd.toEnumeration(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-2", (t) => {
    enum E {
        A = "Airplane",
        B = "Bicycle",
        C = "Car"
    }
    myUtil.test(t, sd.toEnumeration(E), E.A, E.A);
    myUtil.test(t, sd.toEnumeration(E), E.B, E.B);
    myUtil.test(t, sd.toEnumeration(E), E.C, E.C);
    myUtil.fail(t, sd.toEnumeration(E), 0);
    myUtil.fail(t, sd.toEnumeration(E), 1);
    myUtil.fail(t, sd.toEnumeration(E), 2);

    myUtil.test(t, sd.toEnumeration(E), "Airplane", E.A);
    myUtil.test(t, sd.toEnumeration(E), "Bicycle", E.B);
    myUtil.test(t, sd.toEnumeration(E), "Car", E.C);

    myUtil.fail(t, sd.toEnumeration(E), 3);
    myUtil.fail(t, sd.toEnumeration(E), -1);
    myUtil.fail(t, sd.toEnumeration(E), "0");
    myUtil.fail(t, sd.toEnumeration(E), "1");
    myUtil.fail(t, sd.toEnumeration(E), "2");
    myUtil.fail(t, sd.toEnumeration(E), "3");
    myUtil.test(t, sd.toEnumeration(E), "A", E.A);
    myUtil.test(t, sd.toEnumeration(E), "B", E.B);
    myUtil.test(t, sd.toEnumeration(E), "C", E.C);
    myUtil.fail(t, sd.toEnumeration(E), "D");
    myUtil.fail(t, sd.toEnumeration(E), true);
    myUtil.fail(t, sd.toEnumeration(E), false);
    myUtil.fail(t, sd.toEnumeration(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-3", (t) => {
    enum E {
        A = "A",
        B = "B",
        C = "C"
    }
    myUtil.test(t, sd.toEnumeration(E), E.A, E.A);
    myUtil.test(t, sd.toEnumeration(E), E.B, E.B);
    myUtil.test(t, sd.toEnumeration(E), E.C, E.C);
    myUtil.fail(t, sd.toEnumeration(E), 0);
    myUtil.fail(t, sd.toEnumeration(E), 1);
    myUtil.fail(t, sd.toEnumeration(E), 2);

    myUtil.fail(t, sd.toEnumeration(E), "Airplane");
    myUtil.fail(t, sd.toEnumeration(E), "Bicycle");
    myUtil.fail(t, sd.toEnumeration(E), "Car");

    myUtil.fail(t, sd.toEnumeration(E), 3);
    myUtil.fail(t, sd.toEnumeration(E), -1);
    myUtil.fail(t, sd.toEnumeration(E), "0");
    myUtil.fail(t, sd.toEnumeration(E), "1");
    myUtil.fail(t, sd.toEnumeration(E), "2");
    myUtil.fail(t, sd.toEnumeration(E), "3");
    myUtil.test(t, sd.toEnumeration(E), "A", E.A);
    myUtil.test(t, sd.toEnumeration(E), "B", E.B);
    myUtil.test(t, sd.toEnumeration(E), "C", E.C);
    myUtil.fail(t, sd.toEnumeration(E), "D");
    myUtil.fail(t, sd.toEnumeration(E), true);
    myUtil.fail(t, sd.toEnumeration(E), false);
    myUtil.fail(t, sd.toEnumeration(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-4", (t) => {
    enum E {
        A = "C",
        B = "A",
        C = "B"
    }
    myUtil.test(t, sd.toEnumeration(E), E.A, E.A);
    myUtil.test(t, sd.toEnumeration(E), E.B, E.B);
    myUtil.test(t, sd.toEnumeration(E), E.C, E.C);
    myUtil.fail(t, sd.toEnumeration(E), 0);
    myUtil.fail(t, sd.toEnumeration(E), 1);
    myUtil.fail(t, sd.toEnumeration(E), 2);

    myUtil.fail(t, sd.toEnumeration(E), "Airplane");
    myUtil.fail(t, sd.toEnumeration(E), "Bicycle");
    myUtil.fail(t, sd.toEnumeration(E), "Car");

    myUtil.fail(t, sd.toEnumeration(E), 3);
    myUtil.fail(t, sd.toEnumeration(E), -1);
    myUtil.fail(t, sd.toEnumeration(E), "0");
    myUtil.fail(t, sd.toEnumeration(E), "1");
    myUtil.fail(t, sd.toEnumeration(E), "2");
    myUtil.fail(t, sd.toEnumeration(E), "3");
    myUtil.test(t, sd.toEnumeration(E), "A", E.B);
    myUtil.test(t, sd.toEnumeration(E), "B", E.C);
    myUtil.test(t, sd.toEnumeration(E), "C", E.A);
    myUtil.fail(t, sd.toEnumeration(E), "D");
    myUtil.fail(t, sd.toEnumeration(E), true);
    myUtil.fail(t, sd.toEnumeration(E), false);
    myUtil.fail(t, sd.toEnumeration(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-key", (t) => {
    enum E {
        A,
        B,
        C
    }
    myUtil.test(t, sd.toEnumerationKey(E), E.A, "A");
    myUtil.test(t, sd.toEnumerationKey(E), E.B, "B");
    myUtil.test(t, sd.toEnumerationKey(E), E.C, "C");
    myUtil.test(t, sd.toEnumerationKey(E), 0, "A");
    myUtil.test(t, sd.toEnumerationKey(E), 1, "B");
    myUtil.test(t, sd.toEnumerationKey(E), 2, "C");

    myUtil.fail(t, sd.toEnumerationKey(E), 3);
    myUtil.fail(t, sd.toEnumerationKey(E), -1);
    myUtil.fail(t, sd.toEnumerationKey(E), "0");
    myUtil.fail(t, sd.toEnumerationKey(E), "1");
    myUtil.fail(t, sd.toEnumerationKey(E), "2");
    myUtil.fail(t, sd.toEnumerationKey(E), "3");
    myUtil.test(t, sd.toEnumerationKey(E), "A", "A");
    myUtil.test(t, sd.toEnumerationKey(E), "B", "B");
    myUtil.test(t, sd.toEnumerationKey(E), "C", "C");
    myUtil.fail(t, sd.toEnumerationKey(E), "D");
    myUtil.fail(t, sd.toEnumerationKey(E), true);
    myUtil.fail(t, sd.toEnumerationKey(E), false);
    myUtil.fail(t, sd.toEnumerationKey(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-key-2", (t) => {
    enum E {
        A = "Airplane",
        B = "Bicycle",
        C = "Car"
    }
    myUtil.test(t, sd.toEnumerationKey(E), E.A, "A");
    myUtil.test(t, sd.toEnumerationKey(E), E.B, "B");
    myUtil.test(t, sd.toEnumerationKey(E), E.C, "C");
    myUtil.fail(t, sd.toEnumerationKey(E), 0);
    myUtil.fail(t, sd.toEnumerationKey(E), 1);
    myUtil.fail(t, sd.toEnumerationKey(E), 2);

    myUtil.test(t, sd.toEnumerationKey(E), "Airplane", "A");
    myUtil.test(t, sd.toEnumerationKey(E), "Bicycle", "B");
    myUtil.test(t, sd.toEnumerationKey(E), "Car", "C");

    myUtil.fail(t, sd.toEnumerationKey(E), 3);
    myUtil.fail(t, sd.toEnumerationKey(E), -1);
    myUtil.fail(t, sd.toEnumerationKey(E), "0");
    myUtil.fail(t, sd.toEnumerationKey(E), "1");
    myUtil.fail(t, sd.toEnumerationKey(E), "2");
    myUtil.fail(t, sd.toEnumerationKey(E), "3");
    myUtil.test(t, sd.toEnumerationKey(E), "A", "A");
    myUtil.test(t, sd.toEnumerationKey(E), "B", "B");
    myUtil.test(t, sd.toEnumerationKey(E), "C", "C");
    myUtil.fail(t, sd.toEnumerationKey(E), "D");
    myUtil.fail(t, sd.toEnumerationKey(E), true);
    myUtil.fail(t, sd.toEnumerationKey(E), false);
    myUtil.fail(t, sd.toEnumerationKey(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-key-3", (t) => {
    enum E {
        A = "A",
        B = "B",
        C = "C"
    }
    myUtil.test(t, sd.toEnumerationKey(E), E.A, "A");
    myUtil.test(t, sd.toEnumerationKey(E), E.B, "B");
    myUtil.test(t, sd.toEnumerationKey(E), E.C, "C");
    myUtil.fail(t, sd.toEnumerationKey(E), 0);
    myUtil.fail(t, sd.toEnumerationKey(E), 1);
    myUtil.fail(t, sd.toEnumerationKey(E), 2);

    myUtil.fail(t, sd.toEnumerationKey(E), "Airplane");
    myUtil.fail(t, sd.toEnumerationKey(E), "Bicycle");
    myUtil.fail(t, sd.toEnumerationKey(E), "Car");

    myUtil.fail(t, sd.toEnumerationKey(E), 3);
    myUtil.fail(t, sd.toEnumerationKey(E), -1);
    myUtil.fail(t, sd.toEnumerationKey(E), "0");
    myUtil.fail(t, sd.toEnumerationKey(E), "1");
    myUtil.fail(t, sd.toEnumerationKey(E), "2");
    myUtil.fail(t, sd.toEnumerationKey(E), "3");
    myUtil.test(t, sd.toEnumerationKey(E), "A", "A");
    myUtil.test(t, sd.toEnumerationKey(E), "B", "B");
    myUtil.test(t, sd.toEnumerationKey(E), "C", "C");
    myUtil.fail(t, sd.toEnumerationKey(E), "D");
    myUtil.fail(t, sd.toEnumerationKey(E), true);
    myUtil.fail(t, sd.toEnumerationKey(E), false);
    myUtil.fail(t, sd.toEnumerationKey(E), []);

    t.end();
});

tape(__filename + "-to-enumeration-key-4", (t) => {
    enum E {
        A = "C",
        B = "A",
        C = "B"
    }
    myUtil.test(t, sd.toEnumerationKey(E), E.A, "C");
    myUtil.test(t, sd.toEnumerationKey(E), E.B, "A");
    myUtil.test(t, sd.toEnumerationKey(E), E.C, "B");
    myUtil.fail(t, sd.toEnumerationKey(E), 0);
    myUtil.fail(t, sd.toEnumerationKey(E), 1);
    myUtil.fail(t, sd.toEnumerationKey(E), 2);

    myUtil.fail(t, sd.toEnumerationKey(E), "Airplane");
    myUtil.fail(t, sd.toEnumerationKey(E), "Bicycle");
    myUtil.fail(t, sd.toEnumerationKey(E), "Car");

    myUtil.fail(t, sd.toEnumerationKey(E), 3);
    myUtil.fail(t, sd.toEnumerationKey(E), -1);
    myUtil.fail(t, sd.toEnumerationKey(E), "0");
    myUtil.fail(t, sd.toEnumerationKey(E), "1");
    myUtil.fail(t, sd.toEnumerationKey(E), "2");
    myUtil.fail(t, sd.toEnumerationKey(E), "3");
    myUtil.test(t, sd.toEnumerationKey(E), "A", "A");
    myUtil.test(t, sd.toEnumerationKey(E), "B", "B");
    myUtil.test(t, sd.toEnumerationKey(E), "C", "C");
    myUtil.fail(t, sd.toEnumerationKey(E), "D");
    myUtil.fail(t, sd.toEnumerationKey(E), true);
    myUtil.fail(t, sd.toEnumerationKey(E), false);
    myUtil.fail(t, sd.toEnumerationKey(E), []);

    t.end();
});
