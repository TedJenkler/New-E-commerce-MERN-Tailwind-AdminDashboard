import { AssertDelegate } from "../../types";
export interface StrDelegateNullable {
    (minLength: number, maxLength: number): AssertDelegate<string | null>;
    (maxLength: number): AssertDelegate<string | null>;
    (): AssertDelegate<string | null>;
}
export declare function strDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const char: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const varChar: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const tinyText: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const text: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const mediumText: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const longText: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
