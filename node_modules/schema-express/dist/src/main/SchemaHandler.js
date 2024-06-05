"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
class SchemaHandler {
    static Create(getRaw, setRaw, f) {
        const d = sd.toAssertDelegateExact(f);
        return (req, res, next) => {
            let raw = getRaw(req, res);
            if (raw.value == undefined) {
                raw.value = {};
            }
            const value = d(raw.name, raw.value);
            setRaw(req, res, value);
            next();
        };
    }
    static CreateParameter(f) {
        return SchemaHandler.Create((req) => {
            return {
                name: "parameter",
                value: req.params,
            };
        }, (req, _res, value) => {
            req.params = value;
        }, f);
    }
    static CreateQuery(f) {
        return SchemaHandler.Create((req) => {
            return {
                name: "query",
                value: req.query,
            };
        }, (req, _res, value) => {
            req.query = value;
        }, f);
    }
    static CreateBody(f) {
        return SchemaHandler.Create((req) => {
            return {
                name: "body",
                value: req.body,
            };
        }, (req, _res, value) => {
            req.body = value;
        }, f);
    }
    static CreateHeader(f) {
        const d = sd.toAssertDelegateExact(f);
        return SchemaHandler.Create((req) => {
            return {
                name: "header",
                value: req.headers,
            };
        }, (req, _res, value) => {
            req.headers = value;
        }, (name, mixed) => {
            const clean = d(name, mixed);
            return Object.assign({}, mixed, clean);
        });
    }
}
exports.SchemaHandler = SchemaHandler;
//# sourceMappingURL=SchemaHandler.js.map