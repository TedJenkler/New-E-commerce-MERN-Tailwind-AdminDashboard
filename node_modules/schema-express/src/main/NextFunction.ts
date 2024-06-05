export interface NextFunction<NxtLocalsT> {
    (err: any, nxtLocals : NxtLocalsT) : void,
    error : (err : any) => void,
}
/*export type NextFunction<NxtLocalsT> = (
    (err: any, nxtLocals : NxtLocalsT) => void
);*/
/*export type NextFunction<NxtLocalsT> = (
    ((err: any, nxtLocals : NxtLocalsT) => void) &
    {
        error : (err : any) => void,
    }
);*/