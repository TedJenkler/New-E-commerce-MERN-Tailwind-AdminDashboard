import { AnyAssertFunc } from "./types";
export declare function assert<F extends AnyAssertFunc>(assert: F): (target: Object, propertyKey: string | symbol) => void;
