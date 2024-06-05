export interface NextFunction<NxtLocalsT> {
    (err: any, nxtLocals: NxtLocalsT): void;
    error: (err: any) => void;
}
