//For now, relax rules,
//You might have a CastDelegate that creates an object from a string
//export type ParamValue = boolean|number|string;
export type Param<ParamKeys extends string> = {
    [k in ParamKeys] : string;
};
export type AnyParam<ParamKeys extends string> = {
    [k in ParamKeys] : any;
};
