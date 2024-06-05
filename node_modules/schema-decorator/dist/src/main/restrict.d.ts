import { AnyAssertFunc, TypeOf } from "./types";
export declare function restrict<F extends AnyAssertFunc, RawT extends TypeOf<F>>(assert: F, name: string, raw: RawT): TypeOf<F>;
