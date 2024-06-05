"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const DateTimeUtil = require("./util");
function buildDateTimeDelegate(fractionalSecondPrecision /*|4|5|6*/) {
    return sd.or(sd.chain(sd.string(), (name, str) => {
        try {
            return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
        }
        catch (err) {
            throw new Error(`${name}: Invalid MySQL DATETIME(${fractionalSecondPrecision}); ${err.message}`);
        }
    }), 
    //To work with JSON serialization
    sd.chain(sd.or(sd.string(), 
    /*
        We turn the Date object into its JSON representation
        because the Date object may have a millisecond part
        when we do not allow it.

        For example,
        new Date().toJSON() //2019-01-01T00:00:00.123Z

        The above is not assignable to DATETIME(0)
        But is assignable to DATETIME(3)

        -----

        new Date().toJSON() //2019-01-01T00:00:00.120Z

        The above is not assignable to DATETIME(0)
        But is assignable to DATETIME(2) or DATETIME(3)
    */
    sd.chain(sd.instanceOf(Date), (_name, d) => {
        return d.toJSON();
    })), sd.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/, name => `${name} must be in the format YYYY-MM-DDTHH:mm:ss.sssZ`), (name, str) => {
        try {
            str = str.replace("T", " ").replace("Z", "");
            return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
        }
        catch (err) {
            throw new Error(`${name}: Invalid MySQL DATETIME(${fractionalSecondPrecision}); ${err.message}`);
        }
    }));
}
const dateTimeDelegateArr = [
    buildDateTimeDelegate(0),
    buildDateTimeDelegate(1),
    buildDateTimeDelegate(2),
    buildDateTimeDelegate(3),
];
function dateTime(fractionalSecondPrecision = 0) {
    return dateTimeDelegateArr[fractionalSecondPrecision];
}
exports.dateTime = dateTime;
dateTime.nullable = (fractionalSecondPrecision = 0) => sd.nullable(dateTime(fractionalSecondPrecision));
//# sourceMappingURL=date-time.js.map