import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("inheritance", (t) => {
    class Base {
        @schema.assert(validation.Number.assertNaturalNumber)
        base : number = 42;
    }
    class Derived extends Base {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
    }
    myUtil.test(t, Derived, {
        base : 99,
        var : 100
    });
    myUtil.fail(t, Derived, {
        var : 3
    });
    myUtil.fail(t, Derived, {
        base : 3
    });
    myUtil.fail(t, Derived, {
        base : 99,
        var : 100,
        extra : 101
    });
    myUtil.fail(t, Derived, {
        var : 3,
        base : "99"
    });
    myUtil.fail(t, Derived, {
        var : "3",
        base : "99"
    });
    myUtil.fail(t, Derived, {
        var : "3",
        base : 99
    });
    t.end();
});
tape("tighter-restriction-in-derived", (t) => {
    /*
        Here, we see that we can inherit the restrictions of `Base`
        and also allow only a subset the values `Base` allows
    */
    class Base {
        //(-infty, +infty)
        @schema.assert(schema.integer())
        var : number = 0;
    }
    class Derived extends Base {
        //[0, +infty)
        @schema.assert(validation.Number.assertNonNegative)
        var : number = 0;
    }
    myUtil.test(t, Base, {
        var : 3,
    });
    myUtil.test(t, Base, {
        var : 0,
    });
    myUtil.test(t, Base, {
        var : -3,
    });
    myUtil.test(t, Derived, {
        var : 3,
    });
    myUtil.fail(t, Derived, {
        var : -3,
    });
    myUtil.fail(t, Derived, {
        var : 3.141,
    });
    t.end();
});
tape("overlapping-restriction-in-derived", (t) => {
    /*
        Over here, we see that the two restrictions in
        `Base` and `Derived` overlap and only allow
        the value `0` (zero).

        Trying to set any other value on `Derived` will fail.
    */
    class Base {
        //>= 0
        @schema.assert(schema.naturalNumber())
        var : number = 0;
    }
    class Derived extends Base {
        //<= 0
        @schema.assert(schema.and(
            (name, mixed) => {
                return validation.Number.assertLessThanOrEqual(name, mixed, 0);
            }
        ))
        var : number = 0;
    }
    myUtil.test(t, Base, {
        var : 3,
    });
    myUtil.test(t, Base, {
        var : 0,
    });
    myUtil.fail(t, Base, {
        var : -3,
    });
    myUtil.test(t, Derived, {
        var : 0,
    });
    myUtil.fail(t, Derived, {
        var : -3,
    });
    t.end();
});
