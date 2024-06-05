import { AnyAssertFunc, AcceptsOf, TypeOf } from "./types";
export declare type TryMapResult<T> = ({
    success: true;
    value: T;
} | {
    success: false;
    err: any;
});
export declare function tryMap<F extends AnyAssertFunc>(f: F, name: string, mixed: AcceptsOf<F>): TryMapResult<TypeOf<F>>;
