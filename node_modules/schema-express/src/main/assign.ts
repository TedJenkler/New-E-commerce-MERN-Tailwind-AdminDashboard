export type Assign<T, U> = (
    {
        [key in (keyof T)|(keyof U)] : (
            //The values of U overwrite the values of T
            key extends keyof U ?
            U[key] :
            key extends keyof T ?
            T[key] :
            never
        )
    }
);
//The return type of Object.assign() says it is T & U,
//but that's not true.
//It's actually the type given above,
//Object.assign({ x : 1 }, { x : 2 }) = { x : 2 }
export function assign<T, U> (t : T, u : U) : (
    Assign<T, U>
) {
    return Object.assign(t, u) as any;
}