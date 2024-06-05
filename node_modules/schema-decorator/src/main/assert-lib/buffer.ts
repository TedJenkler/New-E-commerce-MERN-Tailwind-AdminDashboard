import {AssertDelegate} from "../types";
import {instanceOf} from "./object";
import {and, chain} from "./operator";
import {naturalNumber} from "./number";

export function buffer () {
    return instanceOf(Buffer);
}

export function maxByteLength (max : number) : (
    AssertDelegate<{ byteLength : number }> &
    {
        __accepts : { byteLength : number }
    }
) {
    const result : AssertDelegate<{ byteLength : number }> = (name : string, mixed : unknown) : { byteLength : number } => {
        const byteLength = naturalNumber()(`${name}.byteLength`, (mixed as any).byteLength);
        if (byteLength > max) {
            throw new Error(`${name} cannot be longer than ${max}, received ${byteLength}`);
        }
        return mixed as any;
    };
    return result as any;
}
export function minByteLength (min : number) : (
    AssertDelegate<{ byteLength : number }> &
    {
        __accepts : { byteLength : number }
    }
) {
    const result : AssertDelegate<{ byteLength : number }> = (name : string, mixed : unknown) : { byteLength : number } => {
        const byteLength = naturalNumber()(`${name}.byteLength`, (mixed as any).byteLength);
        if (byteLength < min) {
            throw new Error(`${name} cannot be shorter than ${min}, received ${byteLength}`);
        }
        return mixed as any;
    };
    return result as any;
}

export function byteLength (max : number) : AssertDelegate<{ byteLength : number }>;
export function byteLength (min : number, max : number) : AssertDelegate<{ byteLength : number }>;
export function byteLength (arg0 : number, arg1? : number) : AssertDelegate<{ byteLength : number }>;
export function byteLength (arg0 : number, arg1? : number) : AssertDelegate<{ byteLength : number }> {
    if (arg1 == undefined) {
        return maxByteLength(arg0);
    } else {
        return chain(
            minByteLength(arg0),
            maxByteLength(arg1)
        );
    }
}

export function bufferLength (max : number) : AssertDelegate<Buffer>;
export function bufferLength (min : number, max : number) : AssertDelegate<Buffer>;
export function bufferLength (arg0 : number, arg1? : number) : AssertDelegate<Buffer>;
export function bufferLength (arg0 : number, arg1? : number) : AssertDelegate<Buffer> {
    return and(
        buffer(),
        byteLength(arg0, arg1)
    );
}


export function tinyBlob () : AssertDelegate<Buffer> {
    return bufferLength(255); //2^8-1
}

export function blob () : AssertDelegate<Buffer> {
    return bufferLength(65_535) //2^16-1
}

export function mediumBlob () : AssertDelegate<Buffer> {
    return bufferLength(16_777_215) //2^24-1
}

export function longBlob () : AssertDelegate<Buffer> {
    return bufferLength(4_294_967_295) //2^32-1
}
