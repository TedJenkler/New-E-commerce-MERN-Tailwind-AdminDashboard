/// <reference types="node" />
import { AssertDelegate } from "../../types";
export interface BufferDelegateNullable {
    (minLength: number, maxLength: number): AssertDelegate<Buffer | null>;
    (maxLength: number): AssertDelegate<Buffer | null>;
    (): AssertDelegate<Buffer | null>;
}
export declare function bufferDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const binary: {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const varBinary: {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const tinyBlob: {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const blob: {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const mediumBlob: {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const longBlob: {
    (minLength: number, maxLength: number): AssertDelegate<Buffer>;
    (maxLength: number): AssertDelegate<Buffer>;
    (): AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
