export function isLiteralOrDate (mixed : unknown) : boolean {
    if (mixed == undefined) {
        return true;
    }
    if (mixed instanceof Date) {
        return true;
    }
    const type = typeof mixed;
    return (
        type == "string" ||
        type == "number" ||
        type == "boolean" ||
        //Hacking in bigint support
        (type as any) == "bigint"
    );
}