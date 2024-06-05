"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const operator_1 = require("./operator");
const number_1 = require("./number");
function buffer() {
    return object_1.instanceOf(Buffer);
}
exports.buffer = buffer;
function maxByteLength(max) {
    const result = (name, mixed) => {
        const byteLength = number_1.naturalNumber()(`${name}.byteLength`, mixed.byteLength);
        if (byteLength > max) {
            throw new Error(`${name} cannot be longer than ${max}, received ${byteLength}`);
        }
        return mixed;
    };
    return result;
}
exports.maxByteLength = maxByteLength;
function minByteLength(min) {
    const result = (name, mixed) => {
        const byteLength = number_1.naturalNumber()(`${name}.byteLength`, mixed.byteLength);
        if (byteLength < min) {
            throw new Error(`${name} cannot be shorter than ${min}, received ${byteLength}`);
        }
        return mixed;
    };
    return result;
}
exports.minByteLength = minByteLength;
function byteLength(arg0, arg1) {
    if (arg1 == undefined) {
        return maxByteLength(arg0);
    }
    else {
        return operator_1.chain(minByteLength(arg0), maxByteLength(arg1));
    }
}
exports.byteLength = byteLength;
function bufferLength(arg0, arg1) {
    return operator_1.and(buffer(), byteLength(arg0, arg1));
}
exports.bufferLength = bufferLength;
function tinyBlob() {
    return bufferLength(255); //2^8-1
}
exports.tinyBlob = tinyBlob;
function blob() {
    return bufferLength(65535); //2^16-1
}
exports.blob = blob;
function mediumBlob() {
    return bufferLength(16777215); //2^24-1
}
exports.mediumBlob = mediumBlob;
function longBlob() {
    return bufferLength(4294967295); //2^32-1
}
exports.longBlob = longBlob;
//# sourceMappingURL=buffer.js.map