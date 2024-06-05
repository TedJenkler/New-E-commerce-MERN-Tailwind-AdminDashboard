import { AssertDelegate } from "../../types";
declare function set<ElementArr extends string[]>(...elements: ElementArr): AssertDelegate<string>;
declare namespace set {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => AssertDelegate<string | null>;
}
export default set;
