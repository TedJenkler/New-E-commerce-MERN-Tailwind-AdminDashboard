"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function tryMap(f, name, mixed) {
    try {
        return {
            success: true,
            value: types_1.toAssertDelegate(f)(name, mixed),
        };
    }
    catch (err) {
        return {
            success: false,
            err,
        };
    }
}
exports.tryMap = tryMap;
;
//# sourceMappingURL=try-map.js.map