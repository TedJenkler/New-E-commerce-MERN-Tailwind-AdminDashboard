import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";

tape("restrict", (t) => {
    @schema.ignoreExtraVariables
    class A {
        @schema.assert(validation.Number.assertNaturalNumber)
        a : number = 42;
    }
    class B {
        @schema.assert(validation.Number.assertNaturalNumber)
        a : number = 42;

        @schema.assert(validation.Number.assertNaturalNumber)
        b : number = 0;
    }
    /*class C {
        @schema.assert(validation.Number.assertNaturalNumber)
        c : number = 0;
    }*/

    const restricted = schema.restrict(A, "restricting B to A", new B());
    console.log(JSON.stringify(restricted));
    t.pass();

    //Should not even compile
    //const restricted2 = schema.restrict(A, "restricting C to A", new C());
    //console.log(JSON.stringify(restricted2));

    t.end();
});
