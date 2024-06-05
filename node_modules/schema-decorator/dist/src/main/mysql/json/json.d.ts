import { AssertDelegate } from "../../types";
export interface JsonDelegateNullable {
    (minLength: number, maxLength: number): AssertDelegate<string | null>;
    (maxLength: number): AssertDelegate<string | null>;
    (): AssertDelegate<string | null>;
}
export declare function jsonDelegate(dataTypeStr: string, absoluteMax: number, defaultSize: number): {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: JsonDelegateNullable;
};
export declare const json: {
    (minLength: number, maxLength: number): AssertDelegate<string>;
    (maxLength: number): AssertDelegate<string>;
    (): AssertDelegate<string>;
    nullable: JsonDelegateNullable;
};
