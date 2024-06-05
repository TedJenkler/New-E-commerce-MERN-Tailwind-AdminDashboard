import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("arrayOfType", (t) => {
    class Foo {
        @schema.assert(schema.array(validation.Number.assertNaturalNumber))
        var : number[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,4,5,6]
    });
    myUtil.fail(t, Foo, {
        var : ["3.2"]
    });
    myUtil.fail(t, Foo, {
        var : [3.2]
    });
    myUtil.fail(t, Foo, {
        var : 3.2
    });
    myUtil.fail(t, Foo, {
        var : "3.2"
    });
    myUtil.fail(t, Foo, {
        var : null
    });
    myUtil.fail(t, Foo, {
        var : undefined
    });
    myUtil.fail(t, Foo, {
    });
    myUtil.fail(t, Foo, {
        var : {}
    });
    t.end();
});
tape("arrayOfOneOfOrType", (t) => {
    class Foo {
        @schema.assert(schema.array(
            schema.or(
                schema.literal("allowed"),
                validation.Number.assertNaturalNumber
            )
        ))
        var : (number|"allowed")[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});
tape("arrayOfOneOfOrCast", (t) => {
    class Foo {
        @schema.assert(schema.array(
            schema.or(
                schema.literal("allowed"),
                schema.cast(validation.NumberString.assertNaturalNumberString, parseInt, validation.Number.assertNaturalNumber)
            )
        ))
        var : (number|"allowed")[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6","allowed"]
    }, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});
tape("arrayOfCast", (t) => {
    class Foo {
        @schema.assert(schema.array(
            schema.cast(validation.NumberString.assertNaturalNumberString, parseInt, validation.Number.assertNaturalNumber)
        ))
        var : number[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6"]
    }, {
        var : [3,4,5,6]
    });
    t.end();
});


tape("literalOrArrayOfType", (t) => {
    class Foo {
        @schema.assert(schema.or(
            schema.literal("allowed"),
            schema.array(validation.Number.assertNaturalNumber)
        ))
        var : "allowed"|(number[]) = [];
    }
    myUtil.test(t, Foo, {
        var : "allowed"
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6]
    });
    t.end();
});
tape("literalOrArrayOfOneOfOrType", (t) => {
    class Foo {
        @schema.assert(schema.or(
            schema.literal("allowed"),
            schema.array(schema.or(
                schema.literal("allowed-sub"),
                validation.Number.assertNaturalNumber
            ))
        ))
        var : "allowed"|((number|"allowed-sub")[]) = [];
    }
    myUtil.test(t, Foo, {
        var : "allowed"
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,"allowed-sub"]
    });
    t.end();
});
tape("literalOrArrayOfOneOfOrCast", (t) => {
    class Foo {
        @schema.assert(schema.or(
            schema.literal("allowed"),
            schema.array(schema.or(
                schema.literal("allowed-sub"),
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            ))
        ))
        var : "allowed"|((number|"allowed-sub")[]) = [];
    }
    myUtil.test(t, Foo, {
        var : "allowed"
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6","allowed-sub"]
    }, {
        var : [3,4,5,6,"allowed-sub"]
    });
    t.end();
});
tape("literalOrArrayOfCast", (t) => {
    class Foo {
        @schema.assert(schema.or(
            schema.literal("allowed"),
            schema.array(schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            ))
        ))
        var : "allowed"|(number[]) = [];
    }
    myUtil.test(t, Foo, {
        var : "allowed"
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6"]
    }, {
        var : [3,4,5,6]
    });
    t.end();
});


tape("optionalArrayOfType", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(validation.Number.assertNaturalNumber)))
        var : undefined|(number[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6]
    });
    t.end();
});
tape("nullableArrayOfType", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(validation.Number.assertNaturalNumber)))
        var : null|(number[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6]
    });
    t.end();
});
tape("maybeArrayOfType", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(validation.Number.assertNaturalNumber)))
        var : undefined|(number[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6]
    });
    t.end();
});


tape("arrayOfOptional", (t) => {
    class Foo {
        @schema.assert(schema.array(schema.optional(validation.Number.assertNaturalNumber)))
        var : (number|undefined)[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("arrayOfNullable", (t) => {
    class Foo {
        @schema.assert(schema.array(schema.nullable(validation.Number.assertNaturalNumber)))
        var : (number|null)[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("arrayOfMaybe", (t) => {
    class Foo {
        @schema.assert(schema.array(schema.maybe(validation.Number.assertNaturalNumber)))
        var : (number|null|undefined)[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});

tape("optionalArrayOfOneOfOrType", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(schema.or(
            schema.literal("allowed"),
            validation.Number.assertNaturalNumber
        ))))
        var : undefined|((number|"allowed")[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});
tape("nullableArrayOfOneOfOrType", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(schema.or(
            schema.literal("allowed"),
            validation.Number.assertNaturalNumber
        ))))
        var : null|((number|"allowed")[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});
tape("maybeArrayOfOneOfOrType", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(schema.or(
            schema.literal("allowed"),
            validation.Number.assertNaturalNumber
        ))))
        var : null|undefined|((number|"allowed")[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});

tape("optionalArrayOfOptional", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.optional(validation.Number.assertNaturalNumber)
        )))
        var : undefined|((number|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("optionalArrayOfNullable", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.nullable(validation.Number.assertNaturalNumber)
        )))
        var : undefined|((number|null)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("optionalArrayOfMaybe", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.maybe(validation.Number.assertNaturalNumber)
        )))
        var : undefined|((number|null|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});

tape("nullableArrayOfOptional", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.optional(validation.Number.assertNaturalNumber)
        )))
        var : null|((number|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("nullableArrayOfNullable", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.nullable(validation.Number.assertNaturalNumber)
        )))
        var : null|((number|null)[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("nullableArrayOfMaybe", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.maybe(validation.Number.assertNaturalNumber)
        )))
        var : null|((number|null|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});

tape("maybeArrayOfOptional", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.optional(validation.Number.assertNaturalNumber)
        )))
        var : null|undefined|((number|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("maybeArrayOfNullable", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.nullable(validation.Number.assertNaturalNumber)
        )))
        var : null|undefined|((number|null)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("maybeArrayOfMaybe", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.maybe(validation.Number.assertNaturalNumber)
        )))
        var : null|undefined|((number|null|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});

tape("optionalArrayOfCast", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            )
        )))
        var : undefined|(number[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6"]
    }, {
        var : [3,4,5,6]
    });
    t.end();
});
tape("nullableArrayOfCast", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            )
        )))
        var : null|(number[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6"]
    }, {
        var : [3,4,5,6]
    });
    t.end();
});
tape("maybeArrayOfCast", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            )
        )))
        var : null|undefined|(number[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6"]
    }, {
        var : [3,4,5,6]
    });
    t.end();
});

tape("arrayOfOptionalCast", (t) => {
    class Foo {
        @schema.assert(schema.array(
            schema.optional(schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            ))
        ))
        var : (number|undefined)[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",undefined]
    }, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("arrayOfNullableCast", (t) => {
    class Foo {
        @schema.assert(schema.array(
            schema.nullable(schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            ))
        ))
        var : (number|null)[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null]
    }, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("arrayOfMaybeCast", (t) => {
    class Foo {
        @schema.assert(schema.array(
            schema.maybe(schema.cast(
                validation.NumberString.assertNaturalNumberString,
                parseInt,
                validation.Number.assertNaturalNumber
            ))
        ))
        var : (number|null|undefined)[] = [];
    }
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null,undefined]
    }, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});

tape("optionalArrayOfOneOfOrCast", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.or(
                schema.literal("allowed"),
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : undefined|((number|"allowed")[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6","allowed"]
    }, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});
tape("nullableArrayOfOneOfOrCast", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.or(
                schema.literal("allowed"),
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|((number|"allowed")[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6","allowed"]
    }, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});
tape("maybeArrayOfOneOfOrCast", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.or(
                schema.literal("allowed"),
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|undefined|((number|"allowed")[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6","allowed"]
    }, {
        var : [3,4,5,6,"allowed"]
    });
    t.end();
});

tape("optionalArrayOfOptionalCast", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.optional(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : undefined|((number|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",undefined]
    }, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("optionalArrayOfNullableCast", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.nullable(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : undefined|((number|null)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null]
    }, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("optionalArrayOfMaybeCast", (t) => {
    class Foo {
        @schema.assert(schema.optional(schema.array(
            schema.maybe(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : undefined|((number|null|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null,undefined]
    }, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});

tape("nullableArrayOfOptionalCast", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.optional(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|((number|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",undefined]
    }, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("nullableArrayOfNullableCast", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.nullable(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|((number|null)[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null]
    }, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("nullableArrayOfMaybeCast", (t) => {
    class Foo {
        @schema.assert(schema.nullable(schema.array(
            schema.maybe(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|((number|null|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null,undefined]
    }, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});


tape("maybeArrayOfOptionalCast", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.optional(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|undefined|((number|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",undefined]
    }, {
        var : [3,4,5,6,undefined]
    });
    t.end();
});
tape("maybeArrayOfNullableCast", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.nullable(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|undefined|((number|null)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null]
    }, {
        var : [3,4,5,6,null]
    });
    t.end();
});
tape("maybeArrayOfMaybeCast", (t) => {
    class Foo {
        @schema.assert(schema.maybe(schema.array(
            schema.maybe(
                schema.cast(
                    validation.NumberString.assertNaturalNumberString,
                    parseInt,
                    validation.Number.assertNaturalNumber
                )
            )
        )))
        var : null|undefined|((number|null|undefined)[]) = [];
    }
    myUtil.test(t, Foo, {
    });
    myUtil.test(t, Foo, {
        var : undefined
    });
    myUtil.test(t, Foo, {
        var : null
    });
    myUtil.test(t, Foo, {
        var : [3,"4",5,"6",null,undefined]
    }, {
        var : [3,4,5,6,null,undefined]
    });
    t.end();
});
