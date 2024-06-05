"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLiteralOrDate(mixed) {
    if (mixed == undefined) {
        return true;
    }
    if (mixed instanceof Date) {
        return true;
    }
    const type = typeof mixed;
    return (type == "string" ||
        type == "number" ||
        type == "boolean" ||
        //Hacking in bigint support
        type == "bigint");
}
exports.isLiteralOrDate = isLiteralOrDate;
//# sourceMappingURL=is-literal-or-date.js.map