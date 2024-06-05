import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";

tape("to-class-exact", (t) => {
    @schema.ignoreExtraVariables
    class Base {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
    }
    class Derived extends Base {
        @schema.assert(validation.Number.assertNaturalNumber)
        someValueInDerived : number = 0;
    }

    const d = new Derived();
    t.assert(d instanceof Derived, "d is derived");
    t.assert(d instanceof Base, "d is base");

    const b = schema.toClass("d", d, Base);
    t.assert(b instanceof Derived, "b is still derived");
    t.assert(b instanceof Base, "b is still base");

    const bExact = schema.toClassExact("d", d, Base);
    t.assert(!(bExact instanceof Derived), "bExact is NOT derived");
    t.assert(bExact instanceof Base, "bExact is base");

    const b2 = schema.toClassExact("b2", {
        var : 10,
        someValueInDerived : 20,
    }, Base);
    t.assert(!(b2 instanceof Derived), "b2 is NOT derived");
    t.assert(b2 instanceof Base, "b2 is base");

    const d2 = schema.toClassExact("d2", {
        var : 10,
        someValueInDerived : 20,
    }, Derived);
    t.assert(d2 instanceof Derived, "d2 is derived");
    t.assert(d2 instanceof Base, "d2 is base");

    t.end();
});
