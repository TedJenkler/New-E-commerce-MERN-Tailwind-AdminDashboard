import * as axios from "axios";
import {Route} from "./Route";
import {
    Request,
    TransformBodyDelegate,
    InjectHeaderDelegate,
    TransformResponseDelegate
} from "./Request";

export interface ApiConfiguration {
    domain : string,
    root? : string,

    onTransformBody? : TransformBodyDelegate,
    onInjectHeader? : InjectHeaderDelegate,
    onTransformResponse? : TransformResponseDelegate,
}

export class Api {
    private readonly config : ApiConfiguration;
    public readonly instance : axios.AxiosInstance;

    getDomain () {
        return this.config.domain;
    }
    getRoot () {
        return this.config.root;
    }
    getBaseUrl () {
        const root = (this.config.root == undefined) ?
            "" :
            this.config.root;

        return `${this.config.domain}${root}`;
    }

    public constructor (config : ApiConfiguration) {
        this.config = config;
        this.instance = axios.default.create({
            baseURL: this.getBaseUrl(),
            responseType: "json",
        });
    }

    request<RouteT extends Route<any>> (route : RouteT) : Request<{
        route : RouteT
    }> {
        return Request.Create(this, route)
            .setOnTransformBody(this.config.onTransformBody)
            .setOnInjectHeader(this.config.onInjectHeader)
            .setOnTransformResponse(this.config.onTransformResponse);
    }
}
