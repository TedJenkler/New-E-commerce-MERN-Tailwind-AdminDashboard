import * as tm from "../../../main/index";
import * as tape from "tape";

tape(__filename, (t) => {
    const dst = tm.fields({
        a2 : tm.finiteNumber(),
    })
    const f = tm.renameMap({
        a : dst.a2,
    });

    tm.check
    t.deepEqual(f("x", { a : 2 }), { a2 : 2 });
    t.deepEqual(f("x", { a : 2, a2 : 3 }), { a2 : 3 });
    t.deepEqual(f("x", { a2 : 2 }), { a2 : 2 });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);
    t.false(tm.tryMap(f, "x", {} as any).success);

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});

tape(__filename, t => {
    const f = tm.renameMap({
    });

    t.deepEqual(f("x", {}), {});
    t.deepEqual(f("x", null), {});
    t.deepEqual(f("x", undefined), {});
    t.deepEqual(f("x", BigInt(0)), {});
    t.deepEqual(f("x", new Date()), {});
    t.deepEqual(f("x", []), {});
    t.deepEqual(f("x", NaN), {});
    t.deepEqual(f("x", Infinity), {});
    t.deepEqual(f("x", "test"), {});
    t.deepEqual(f("x", 0), {});
    t.deepEqual(f("x", true), {});
    t.deepEqual(f("x", new Number(1)), {});

    t.end();
});

tape(__filename, t => {
    const dst = tm.fields({
        a2 : tm.finiteNumber(),
        b2 : tm.toTrimmed(),
    })
    const f = tm.renameMap({
        a : dst.a2,
        b : dst.b2,
    });

    t.deepEqual(f("x", { a : 2, b : "  test  " }), { a2 : 2, b2 : "test" });
    t.deepEqual(f("x", { a : 2, a2 : 3, b : "  test  ", b2 : "qwerty     " }), { a2 : 3, b2 : "qwerty" });
    t.deepEqual(f("x", { a2 : 2, b2 : "test  " }), { a2 : 2, b2 : "test" });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);
    t.false(tm.tryMap(f, "x", { a : 2 } as any).success);
    t.false(tm.tryMap(f, "x", { b : "test" } as any).success);

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});

tape(__filename, t => {
    const dst = tm.fields({
        a2 : tm.optional(tm.finiteNumber()),
    });
    const f = tm.renameMap({
        a : dst.a2,
    });

    t.deepEqual(f("x", { a : 2 }), { a2 : 2 });
    t.deepEqual(f("x", { a : 2, a2 : 3 }), { a2 : 3 });
    t.deepEqual(f("x", { a : undefined, a2 : 3 }), { a2 : 3 });
    t.deepEqual(f("x", { a2 : 3 }), { a2 : 3 });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);

    /**
        The t.true() cases below might be surprising but
        they *do* satisfy `{ a? : number|undefined }`.

        ```ts
        (new Date()).a === undefined
        ```

        Limiting objects to just POJOs (Plain old JS objects) would
        heavily reduce this mapper's usability with user-defined classes,
        ```ts
        class Foo {
            a : number|undefined
        }
        const foo = new Foo();
        mapper("foo", foo); //Err, `foo` is not a POJO
        ```

        We could try to filter out the most common class instances
        that would be surprising to map successfully,
        but that just feels like a never-ending race.

        -----

        The takeaway here is that you should try to avoid maps
        where every single field is optional.
    */
    t.deepEqual(f("x", new Date()), { a2 : undefined });

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.true(tm.tryMap(f, "x", new Date() as any).success);
    t.true(tm.tryMap(f, "x", [] as any).success);
    t.true(tm.tryMap(f, "x", [true] as any).success);
    t.true(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.true(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});

tape(__filename, t => {
    const dst = tm.fields({
        a2 : tm.optional(tm.finiteNumber()),
        b2 : tm.nullable(tm.string())
    });
    const f = tm.renameMap({
        a : dst.a2,
        b : dst.b2,
    });

    t.deepEqual(f("x", { a : 2, b : "hi" }), { a2 : 2, b2 : "hi" });
    t.deepEqual(f("x", { a : 2, a2 : 3, b : null, b2 : "bye" }), { a2 : 3, b2 : "bye" });
    t.deepEqual(f("x", { a : undefined, a2 : 3, b : "test", b2 : null }), { a2 : 3, b2 : null });
    t.deepEqual(f("x", { a2 : 3, b : "test2" }), { a2 : 3, b2 : "test2" });
    t.deepEqual(f("x", { b : "hello" }), { a2 : undefined, b2 : "hello" });
    t.false(tm.tryMap(f, "x", { a : "2", b : "test3" } as any).success);
    t.false(tm.tryMap(f, "x", { a : 4 } as any).success);

    /**
        The cases below now all fail because
        they do not have property `b`.

        However, if one of them had all the required
        properties, they would pass.
    */
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});