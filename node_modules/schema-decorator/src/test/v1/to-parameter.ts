import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename, (t) => {
    const s = sd.toSchema({
        field0 : sd.stringToNaturalNumber(),
        field1 : sd.date()
    });
    const func = sd.toParameter(
        s,
        (args) => {
            return args;
        }
    );

    t.deepEquals(
        func({
            field0 : 3,
            field1 : new Date(0)
        }),
        {
            field0 : 3,
            field1 : new Date(0)
        }
    );
    t.deepEquals(
        (func as any)({
            field0 : 3,
            field1 : new Date(0),
            extraField : "This should not appear"
        }),
        {
            field0 : 3,
            field1 : new Date(0)
        }
    );
    t.deepEquals(
        (func as any)({
            //This is a string but should be converted to a natural number
            field0 : "3",
            field1 : new Date(0)
        }),
        {
            field0 : 3,
            field1 : new Date(0)
        }
    );
    t.deepEquals(
        (func as any)({
            field0 : 3,
            //This should be converted to a `Date`
            //with zero ms since Jan 1 1970 midnight
            field1 : "1970-01-01T00:00:00Z"
        }),
        {
            field0 : 3,
            field1 : new Date(0)
        }
    );
    try {
        func({
            //This is not a natural number and will
            //give us run-time errors
            field0 : 3.1,
            field1 : new Date(0)
        });
    } catch (err) {
        t.pass(err.message);
    }
    try {
        (func as any)({
            //This is not a natural number and will
            //give us run-time errors
            field0 : "3.2",
            field1 : new Date(0)
        });
    } catch (err) {
        t.pass(err.message);
    }
    t.end();
});