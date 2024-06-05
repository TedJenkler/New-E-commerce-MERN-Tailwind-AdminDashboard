"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const operator_1 = require("./operator");
function renameMap(map) {
    const arr = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(object_1.rename(k, f));
    }
    if (arr.length == 0) {
        return (() => { return {}; });
    }
    return operator_1.chain(object_1.instanceOf(Object), operator_1.intersect(...arr));
}
exports.renameMap = renameMap;
function partialRenameMap(map) {
    const arr = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(object_1.rename(k, f.optional()));
    }
    if (arr.length == 0) {
        return (() => { return {}; });
    }
    return operator_1.chain(object_1.instanceOf(Object), operator_1.intersect(...arr));
}
exports.partialRenameMap = partialRenameMap;
//# sourceMappingURL=rename-map.js.map