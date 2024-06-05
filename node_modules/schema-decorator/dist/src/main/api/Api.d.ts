import * as axios from "axios";
import { Route } from "./Route";
import { Request, TransformBodyDelegate, InjectHeaderDelegate, TransformResponseDelegate } from "./Request";
export interface ApiConfiguration {
    domain: string;
    root?: string;
    onTransformBody?: TransformBodyDelegate;
    onInjectHeader?: InjectHeaderDelegate;
    onTransformResponse?: TransformResponseDelegate;
}
export declare class Api {
    private readonly config;
    readonly instance: axios.AxiosInstance;
    getDomain(): string;
    getRoot(): string | undefined;
    getBaseUrl(): string;
    constructor(config: ApiConfiguration);
    request<RouteT extends Route<any>>(route: RouteT): Request<{
        route: RouteT;
    }>;
}
