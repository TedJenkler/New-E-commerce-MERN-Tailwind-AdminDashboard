"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//The return type of Object.assign() says it is T & U,
//but that's not true.
//It's actually the type given above,
//Object.assign({ x : 1 }, { x : 2 }) = { x : 2 }
function assign(t, u) {
    return Object.assign(t, u);
}
exports.assign = assign;
//# sourceMappingURL=assign.js.map