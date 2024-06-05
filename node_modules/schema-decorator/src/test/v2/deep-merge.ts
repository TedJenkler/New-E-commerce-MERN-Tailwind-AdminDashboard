import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename + "-deep-merge", (t) => {
    t.deepEqual(
        sd.deepMerge(
            {
                x : 32
            },
            {
                y : 42
            }
        ),
        {
            x : 32,
            y : 42
        }
    );
    t.deepEqual(
        sd.deepMerge(
            {
                x : 32,
                z : {
                    hello : "world"
                }
            },
            {
                y : 42,
                z : {
                    hello : "world",
                    arr : [1,2,3,4]
                }
            }
        ),
        {
            x : 32,
            y : 42,
            z : {
                hello : "world",
                arr : [1,2,3,4]
            }
        }
    );
    t.deepEqual(
        sd.deepMerge(
            [1,2,3],
            [1,2,3,4]
        ),
        [1,2,3,4]
    );
    try {
        sd.deepMerge(
            { x : 1 },
            { x : 2 }
        );
        t.fail("Should not be able to merge");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});
