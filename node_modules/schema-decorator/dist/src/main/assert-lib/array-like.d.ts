import { AssertDelegate } from "../types";
export declare function maxLength(max: number): (AssertDelegate<{
    length: number;
}> & {
    __accepts: {
        length: number;
    };
});
export declare function minLength(min: number): (AssertDelegate<{
    length: number;
}> & {
    __accepts: {
        length: number;
    };
});
export declare function length(max: number): (AssertDelegate<{
    length: number;
}> & {
    __accepts: {
        length: number;
    };
});
export declare function length(min: number, max: number): (AssertDelegate<{
    length: number;
}> & {
    __accepts: {
        length: number;
    };
});
export declare function length(arg0: number, arg1?: number): (AssertDelegate<{
    length: number;
}> & {
    __accepts: {
        length: number;
    };
});
