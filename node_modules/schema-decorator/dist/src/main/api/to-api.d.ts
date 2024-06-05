import { Route } from "./Route";
import { ApiConfiguration, Api } from "./Api";
import { Request } from "./Request";
export declare type RouteMap = {
    [routeName: string]: Route<any>;
};
export declare type ApiMixin<RouteMapT extends RouteMap> = (Api & {
    [routeName in keyof RouteMapT]: () => (Extract<RouteMapT[routeName]["data"]["path"]["_dummyParamKeys"], string> extends never ? Request<{
        api: Api;
        route: RouteMapT[routeName];
    }> : ("paramF" extends keyof RouteMapT[routeName]["data"] ? Request<{
        api: Api;
        route: RouteMapT[routeName];
    }> : never));
});
export declare type ApiMixinType<RouteMapT extends RouteMap> = {
    new (config: ApiConfiguration): (ApiMixin<RouteMapT>);
    readonly route: Readonly<RouteMapT>;
};
export declare type ApiInstance<ApiMixinTypeT extends ApiMixinType<any>> = (ApiMixinTypeT extends ApiMixinType<infer RouteMapT> ? ApiMixin<RouteMapT> : never);
export declare function toApi<RouteMapT extends RouteMap>(routeMap: RouteMapT): ApiMixinType<RouteMapT>;
