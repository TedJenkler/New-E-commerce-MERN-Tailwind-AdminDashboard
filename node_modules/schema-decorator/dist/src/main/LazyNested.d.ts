import { AssertDelegate } from "./types";
export declare class LazyNested<T> {
    private ctor;
    private delegate;
    constructor();
    setCtor(ctor: {
        new (): T;
    }): void;
    setDelegate(delegate: AssertDelegate<T>): void;
    assert: (name: string, mixed: any) => T;
}
