export declare type Assign<T, U> = ({
    [key in (keyof T) | (keyof U)]: (key extends keyof U ? U[key] : key extends keyof T ? T[key] : never);
});
export declare function assign<T, U>(t: T, u: U): (Assign<T, U>);
