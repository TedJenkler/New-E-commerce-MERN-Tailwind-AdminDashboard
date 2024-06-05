import * as express from "express";
import * as sd from "schema-decorator";
import {RequestVoidHandler} from "./VoidHandler";

export class SchemaHandler {
    public static Create<F extends sd.AnyAssertFunc> (
        getRaw : (req  : express.Request, res : express.Response) => {
            name  : string,
            value : any,
        },
        setRaw : (req  : express.Request, res : express.Response, value : sd.TypeOf<F>) => void,
        f : F
    ) : RequestVoidHandler<any, any> {
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

    public static CreateParameter<F extends sd.AnyAssertFunc> (f : F) {
        return SchemaHandler.Create(
            (req) => {
                return {
                    name  : "parameter",
                    value : req.params,
                };
            },
            (req, _res, value) =>{
                req.params = value;
            },
            f
        );
    }
    public static CreateQuery<F extends sd.AnyAssertFunc> (f : F) {
        return SchemaHandler.Create(
            (req) => {
                return {
                    name  : "query",
                    value : req.query,
                };
            },
            (req, _res, value) =>{
                req.query = value;
            },
            f
        );
    }
    public static CreateBody<F extends sd.AnyAssertFunc> (f : F) {
        return SchemaHandler.Create(
            (req) => {
                return {
                    name  : "body",
                    value : req.body,
                };
            },
            (req, _res, value) =>{
                req.body = value;
            },
            f
        );
    }
    public static CreateHeader<F extends sd.AnyAssertFunc> (f : F) {
        const d = sd.toAssertDelegateExact(f);
        return SchemaHandler.Create(
            (req) => {
                return {
                    name  : "header",
                    value : req.headers,
                };
            },
            (req, _res, value) =>{
                req.headers = value;
            },
            (name : string, mixed : unknown) => {
                const clean = d(name, mixed);
                return {
                    //When running the assertion,
                    //fields not checked are removed.
                    //But we want the unchecked headers
                    //to remain; they'll just be strings
                    ...mixed,
                    ...(clean as any),
                }
            }
        );
    }
}
