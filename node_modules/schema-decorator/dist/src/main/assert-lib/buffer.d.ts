/// <reference types="node" />
import { AssertDelegate } from "../types";
export declare function buffer(): AssertDelegate<Buffer> & {
    __accepts: Buffer;
    __canAccept: Buffer;
};
export declare function maxByteLength(max: number): (AssertDelegate<{
    byteLength: number;
}> & {
    __accepts: {
        byteLength: number;
    };
});
export declare function minByteLength(min: number): (AssertDelegate<{
    byteLength: number;
}> & {
    __accepts: {
        byteLength: number;
    };
});
export declare function byteLength(max: number): AssertDelegate<{
    byteLength: number;
}>;
export declare function byteLength(min: number, max: number): AssertDelegate<{
    byteLength: number;
}>;
export declare function byteLength(arg0: number, arg1?: number): AssertDelegate<{
    byteLength: number;
}>;
export declare function bufferLength(max: number): AssertDelegate<Buffer>;
export declare function bufferLength(min: number, max: number): AssertDelegate<Buffer>;
export declare function bufferLength(arg0: number, arg1?: number): AssertDelegate<Buffer>;
export declare function tinyBlob(): AssertDelegate<Buffer>;
export declare function blob(): AssertDelegate<Buffer>;
export declare function mediumBlob(): AssertDelegate<Buffer>;
export declare function longBlob(): AssertDelegate<Buffer>;
