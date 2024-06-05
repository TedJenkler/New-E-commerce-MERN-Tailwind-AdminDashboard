import { AssertDelegate } from "../../types";
declare function enumDelegate<ElementArr extends string[]>(...elements: ElementArr): AssertDelegate<ElementArr[number]>;
declare namespace enumDelegate {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => AssertDelegate<ElementArr[number] | null>;
}
export { enumDelegate as enum };
