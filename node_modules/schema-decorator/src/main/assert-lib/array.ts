import {
    AnyAssertFunc,
    AssertDelegate,
    TypeOf,
    toAssertDelegateExact,
    AcceptsOf,
    CanAcceptOf
} from "../types";
import {toTypeStr} from "../util";

export type ArrayAssertDelegate<F extends AnyAssertFunc> = (
    AssertDelegate<TypeOf<F>[]> &
    {
        __accepts : AcceptsOf<F>[],
        __canAccept : CanAcceptOf<F>[],
    }
);
export function array<F extends AnyAssertFunc> (assert : F) : (
    ArrayAssertDelegate<F>
) {
    const assertDelegate = toAssertDelegateExact(assert);
    const result : AssertDelegate<TypeOf<F>[]> = (name : string, mixed : unknown) : TypeOf<F>[] => {
        if (!(mixed instanceof Array)) {
            throw new Error(`Expected ${name} to be an array, received ${toTypeStr(mixed)}`);
        }
        let result = mixed;
        let isCopy = false;
        for (let i=0; i<result.length; ++i) {
            const cur = assertDelegate(`${name}[${i}]`, result[i]);
            if (cur !== result[i] && !isCopy) {
                result = result.slice();
                isCopy = true;
            }
            result[i] = cur;
        }
        return result;
    };
    return result as any;
}
