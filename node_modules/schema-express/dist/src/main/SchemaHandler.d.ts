import * as express from "express";
import * as sd from "schema-decorator";
import { RequestVoidHandler } from "./VoidHandler";
export declare class SchemaHandler {
    static Create<F extends sd.AnyAssertFunc>(getRaw: (req: express.Request, res: express.Response) => {
        name: string;
        value: any;
    }, setRaw: (req: express.Request, res: express.Response, value: sd.TypeOf<F>) => void, f: F): RequestVoidHandler<any, any>;
    static CreateParameter<F extends sd.AnyAssertFunc>(f: F): RequestVoidHandler<any, any>;
    static CreateQuery<F extends sd.AnyAssertFunc>(f: F): RequestVoidHandler<any, any>;
    static CreateBody<F extends sd.AnyAssertFunc>(f: F): RequestVoidHandler<any, any>;
    static CreateHeader<F extends sd.AnyAssertFunc>(f: F): RequestVoidHandler<any, any>;
}
