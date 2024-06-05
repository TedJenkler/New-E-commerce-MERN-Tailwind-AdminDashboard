export function deepEqual (actual : any, expected : any) : boolean {
    if (actual === expected) {
        return true;
    }

    if ((actual instanceof Date) && (expected instanceof Date)) {
        return (actual.getTime() === expected.getTime());
    }

    if (
        actual == undefined ||
        typeof actual != "object" ||
        expected == undefined ||
        typeof expected != "object"
    ) {
        return (actual === expected);
    }

    if (actual.prototype !== expected.prototype) {
        return false;
    }

    const actualKeys = Object.keys(actual);
    const expectedKeys = Object.keys(expected);

    if (actualKeys.length != expectedKeys.length) {
        return false;
    }

    actualKeys.sort();
    expectedKeys.sort();

    for (let i=0; i<actualKeys.length; ++i) {
        if (actualKeys[i] != expectedKeys[i]) {
            return false;
        }
    }

    for (let key of actualKeys) {
        if (!deepEqual(actual[key], expected[key])) {
            return false;
        }
    }

    return true;
}