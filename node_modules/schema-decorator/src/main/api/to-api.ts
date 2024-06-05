import {Route} from "./Route";
import {ApiConfiguration, Api} from "./Api";
import {Request} from "./Request";
import {rename} from "@anyhowstep/type-util";

export type RouteMap = {
    [routeName : string] : Route<any>
};

export type ApiMixin<RouteMapT extends RouteMap> = (
    Api &
    {
        [routeName in keyof RouteMapT] : () => (
            Extract<
                RouteMapT[routeName]["data"]["path"]["_dummyParamKeys"],
                string
            > extends never ?
                //No param checks to perform
                Request<{
                    api : Api,
                    route : RouteMapT[routeName]
                }> :
                //We have some param checks to perform
                (
                    "paramF" extends keyof RouteMapT[routeName]["data"] ?
                        //Successfully set an assertion for param
                        Request<{
                            api : Api,
                            route : RouteMapT[routeName]
                        }> :
                        //Didn't set one yet
                        never
                )
        )
    }
);
export type ApiMixinType<RouteMapT extends RouteMap> = {
    new (config: ApiConfiguration) : (
        ApiMixin<RouteMapT>
    ),
    readonly route : Readonly<RouteMapT>
}
export type ApiInstance<ApiMixinTypeT extends ApiMixinType<any>> = (
    ApiMixinTypeT extends ApiMixinType<infer RouteMapT> ?
        ApiMixin<RouteMapT> :
        never
);

export function toApi<RouteMapT extends RouteMap> (
    routeMap : RouteMapT
) : ApiMixinType<RouteMapT> {
    @rename("ApiMixin")
    class _ApiMixin extends Api {

    }
    (_ApiMixin as any).route = routeMap;
    for (let routeKey in routeMap) {
        (_ApiMixin as any).prototype[routeKey] = function (this : Api) {
            return this.request(routeMap[routeKey]);
        };
    }
    return _ApiMixin as any;
}