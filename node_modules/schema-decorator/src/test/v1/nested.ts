import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("nested", (t) => {
    class Nested {
        @schema.assert(validation.Number.assertNaturalNumber)
        nestedNum : number;
        constructor (x? : number) {
            this.nestedNum = (typeof x == "number") ?
                x : 0;
        }
    }
    class Foo {
        @schema.assert(schema.nested(Nested))
        var : Nested = new Nested();
        @schema.assert(schema.array(schema.nested(Nested)))
        arr : Nested[] = [];
    }
    myUtil.test(t, Foo, {
        var : {
            nestedNum : 2
        },
        arr : [
            {
                nestedNum : 3
            },
            {
                nestedNum : 4
            },
            new Nested(5)
        ]
    }, {
        var : {
            nestedNum : 2
        },
        arr : [
            {
                nestedNum : 3
            },
            {
                nestedNum : 4
            },
            {
                nestedNum : 5
            },
        ]
    });
    t.end();
});
function testManyNested (nestCount : number) {
    tape("many-nesting", (t) => {
        class Nested {
            @schema.assert(schema.optional(schema.nested(Nested)))
            var? : Nested;
            @schema.assert(validation.Number.assertFiniteNumber)
            random : number = Math.random();
            @schema.assert(schema.array(schema.nested(Nested)))
            arr : Nested[] = [];
        }
        let raw : any = {
            random : Math.random(),
            arr : [],
        };
        let nested : any = raw;
        for (let i=0; i<nestCount; ++i) {
            nested.var = {
                random : Math.random(),
                arr : [],
            };
            const max = Math.floor(Math.random() * 10)+1;
            for (let j=0; j<max; ++j) {
                nested.var.arr.push({
                    random : Math.random(),
                    arr : [],
                });
            }
            if (Math.random() < 0.5) {
                nested = nested.var;
            } else {
                nested = nested.var.arr[Math.floor(Math.random() * max)];
            }
        }
        myUtil.test(t, Nested, raw);
        t.end();
    });
}
for (let i=0; i<10; ++i) {
    testManyNested(i);
}
