import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-valid-date", (t) => {
    const now = new Date();
    myUtil.test(t, sd.validDate(), new Date(0), new Date(0));
    myUtil.test(t, sd.validDate(), now, now);
    myUtil.test(t, sd.validDate(), new Date(100), new Date(100));
    myUtil.test(t, sd.validDate(), new Date("2018-01-01"), new Date("2018-01-01"));

    myUtil.fail(t, sd.validDate(), new Date(NaN));
    myUtil.fail(t, sd.validDate(), new Date(Infinity));
    myUtil.fail(t, sd.validDate(), new Date(-Infinity));
    myUtil.fail(t, sd.validDate(), NaN);
    myUtil.fail(t, sd.validDate(), Infinity);
    myUtil.fail(t, sd.validDate(), -Infinity);
    myUtil.fail(t, sd.validDate(), new Date("qwerty"));
    myUtil.fail(t, sd.validDate(), true);
    myUtil.fail(t, sd.validDate(), false);
    myUtil.fail(t, sd.validDate(), 0);
    myUtil.fail(t, sd.validDate(), 100);
    myUtil.fail(t, sd.validDate(), "2018-01-01");

    t.end();
});

tape(__filename + "-date", (t) => {
    const now = new Date();
    myUtil.test(t, sd.date(), new Date(0), new Date(0));
    myUtil.test(t, sd.date(), now, now);
    myUtil.test(t, sd.date(), new Date(100), new Date(100));
    myUtil.test(t, sd.date(), new Date("2018-01-01"), new Date("2018-01-01"));

    myUtil.fail(t, sd.date(), new Date(NaN));
    myUtil.fail(t, sd.date(), new Date(Infinity));
    myUtil.fail(t, sd.date(), new Date(-Infinity));
    myUtil.fail(t, sd.date(), NaN);
    myUtil.fail(t, sd.date(), Infinity);
    myUtil.fail(t, sd.date(), -Infinity);
    myUtil.fail(t, sd.date(), new Date("qwerty"));
    myUtil.fail(t, sd.date(), true);
    myUtil.fail(t, sd.date(), false);
    myUtil.test(t, sd.date(), 0, new Date(0));
    myUtil.test(t, sd.date(), 100, new Date(100));
    myUtil.test(t, sd.date(), "2018-01-01", new Date("2018-01-01"));

    t.end();
});

tape(__filename + "-date-to-unix-timestamp", (t) => {
    const now = new Date();
    myUtil.test(t, sd.dateToUnixTimestamp(), new Date(0), 0);
    myUtil.test(t, sd.dateToUnixTimestamp(), now, Math.floor(now.getTime()/1000));
    myUtil.test(t, sd.dateToUnixTimestamp(), new Date(100), 0);
    myUtil.test(t, sd.dateToUnixTimestamp(), new Date("2018-01-01"), Math.floor(new Date("2018-01-01").getTime()/1000));

    myUtil.fail(t, sd.dateToUnixTimestamp(), new Date(NaN));
    myUtil.fail(t, sd.dateToUnixTimestamp(), new Date(Infinity));
    myUtil.fail(t, sd.dateToUnixTimestamp(), new Date(-Infinity));
    myUtil.fail(t, sd.dateToUnixTimestamp(), NaN);
    myUtil.fail(t, sd.dateToUnixTimestamp(), Infinity);
    myUtil.fail(t, sd.dateToUnixTimestamp(), -Infinity);
    myUtil.fail(t, sd.dateToUnixTimestamp(), new Date("qwerty"));
    myUtil.fail(t, sd.dateToUnixTimestamp(), true);
    myUtil.fail(t, sd.dateToUnixTimestamp(), false);
    myUtil.test(t, sd.dateToUnixTimestamp(), 0, 0);
    myUtil.test(t, sd.dateToUnixTimestamp(), 100, 0);
    myUtil.test(t, sd.dateToUnixTimestamp(), "2018-01-01", Math.floor(new Date("2018-01-01").getTime()/1000));

    t.end();
});

tape(__filename + "-unix-timestamp-to-date-timestamp", (t) => {
    const now = new Date();
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date(0));
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), now);
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date(100));
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date("2018-01-01"));

    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date(NaN));
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date(Infinity));
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date(-Infinity));
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), NaN);
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), Infinity);
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), -Infinity);
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), new Date("qwerty"));
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), true);
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), false);
    myUtil.test(t, sd.unixTimestampToDateTimestamp(), 0, 0);
    myUtil.test(t, sd.unixTimestampToDateTimestamp(), 1, 1000);
    myUtil.test(t, sd.unixTimestampToDateTimestamp(), 100, 100000);
    myUtil.test(t, sd.unixTimestampToDateTimestamp(), 999, 999000);
    myUtil.fail(t, sd.unixTimestampToDateTimestamp(), "2018-01-01");

    t.end();
});

tape(__filename + "-unix-timestamp-to-date", (t) => {
    const now = new Date();
    myUtil.fail(t, sd.unixTimestampToDate(), new Date(0));
    myUtil.fail(t, sd.unixTimestampToDate(), now);
    myUtil.fail(t, sd.unixTimestampToDate(), new Date(100));
    myUtil.fail(t, sd.unixTimestampToDate(), new Date("2018-01-01"));

    myUtil.fail(t, sd.unixTimestampToDate(), new Date(NaN));
    myUtil.fail(t, sd.unixTimestampToDate(), new Date(Infinity));
    myUtil.fail(t, sd.unixTimestampToDate(), new Date(-Infinity));
    myUtil.fail(t, sd.unixTimestampToDate(), NaN);
    myUtil.fail(t, sd.unixTimestampToDate(), Infinity);
    myUtil.fail(t, sd.unixTimestampToDate(), -Infinity);
    myUtil.fail(t, sd.unixTimestampToDate(), new Date("qwerty"));
    myUtil.fail(t, sd.unixTimestampToDate(), true);
    myUtil.fail(t, sd.unixTimestampToDate(), false);
    myUtil.test(t, sd.unixTimestampToDate(), 0, new Date(0));
    myUtil.test(t, sd.unixTimestampToDate(), 1, new Date(1000));
    myUtil.test(t, sd.unixTimestampToDate(), 100, new Date(100000));
    myUtil.test(t, sd.unixTimestampToDate(), 999, new Date(999000));
    myUtil.fail(t, sd.unixTimestampToDate(), "2018-01-01");

    t.end();
});

tape(__filename + "-date-time-without-millisecond", (t) => {
    const now = new Date();
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), new Date(0), new Date(0));
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), now, new Date(Math.floor(now.getTime()/1000) * 1000));
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), new Date(100), new Date(0));
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), new Date("2018-01-01"), new Date("2018-01-01"));

    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), new Date(NaN));
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), new Date(Infinity));
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), new Date(-Infinity));
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), NaN);
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), Infinity);
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), -Infinity);
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), new Date("qwerty"));
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), true);
    myUtil.fail(t, sd.dateTimeWithoutMillisecond(), false);
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), 0, new Date(0));
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), 100, new Date(0));
    myUtil.test(t, sd.dateTimeWithoutMillisecond(), "2018-01-01", new Date("2018-01-01"));

    t.end();
});

tape(__filename + "-date-time", (t) => {
    const now = new Date();
    myUtil.test(t, sd.dateTime(), new Date(0), new Date(0));
    myUtil.test(t, sd.dateTime(), now, new Date(Math.floor(now.getTime()/1000) * 1000));
    myUtil.test(t, sd.dateTime(), new Date(100), new Date(0));
    myUtil.test(t, sd.dateTime(), new Date("2018-01-01"), new Date("2018-01-01"));

    myUtil.fail(t, sd.dateTime(), new Date(NaN));
    myUtil.fail(t, sd.dateTime(), new Date(Infinity));
    myUtil.fail(t, sd.dateTime(), new Date(-Infinity));
    myUtil.fail(t, sd.dateTime(), NaN);
    myUtil.fail(t, sd.dateTime(), Infinity);
    myUtil.fail(t, sd.dateTime(), -Infinity);
    myUtil.fail(t, sd.dateTime(), new Date("qwerty"));
    myUtil.fail(t, sd.dateTime(), true);
    myUtil.fail(t, sd.dateTime(), false);
    myUtil.test(t, sd.dateTime(), 0, new Date(0));
    myUtil.test(t, sd.dateTime(), 100, new Date(0));
    myUtil.test(t, sd.dateTime(), "2018-01-01", new Date("2018-01-01"));

    t.end();
});

tape(__filename + "-date-time-with-millisecond", (t) => {
    const now = new Date();
    myUtil.test(t, sd.dateTimeWithMillisecond(), new Date(0), new Date(0));
    myUtil.test(t, sd.dateTimeWithMillisecond(), now, now);
    myUtil.test(t, sd.dateTimeWithMillisecond(), new Date(100), new Date(100));
    myUtil.test(t, sd.dateTimeWithMillisecond(), new Date("2018-01-01"), new Date("2018-01-01"));

    myUtil.fail(t, sd.dateTimeWithMillisecond(), new Date(NaN));
    myUtil.fail(t, sd.dateTimeWithMillisecond(), new Date(Infinity));
    myUtil.fail(t, sd.dateTimeWithMillisecond(), new Date(-Infinity));
    myUtil.fail(t, sd.dateTimeWithMillisecond(), NaN);
    myUtil.fail(t, sd.dateTimeWithMillisecond(), Infinity);
    myUtil.fail(t, sd.dateTimeWithMillisecond(), -Infinity);
    myUtil.fail(t, sd.dateTimeWithMillisecond(), new Date("qwerty"));
    myUtil.fail(t, sd.dateTimeWithMillisecond(), true);
    myUtil.fail(t, sd.dateTimeWithMillisecond(), false);
    myUtil.test(t, sd.dateTimeWithMillisecond(), 0, new Date(0));
    myUtil.test(t, sd.dateTimeWithMillisecond(), 100, new Date(100));
    myUtil.test(t, sd.dateTimeWithMillisecond(), "2018-01-01", new Date("2018-01-01"));

    t.end();
});

tape(__filename + "-date-time(3)", (t) => {
    const now = new Date();
    myUtil.test(t, sd.dateTime3(), new Date(0), new Date(0));
    myUtil.test(t, sd.dateTime3(), now, now);
    myUtil.test(t, sd.dateTime3(), new Date(100), new Date(100));
    myUtil.test(t, sd.dateTime3(), new Date("2018-01-01"), new Date("2018-01-01"));

    myUtil.fail(t, sd.dateTime3(), new Date(NaN));
    myUtil.fail(t, sd.dateTime3(), new Date(Infinity));
    myUtil.fail(t, sd.dateTime3(), new Date(-Infinity));
    myUtil.fail(t, sd.dateTime3(), NaN);
    myUtil.fail(t, sd.dateTime3(), Infinity);
    myUtil.fail(t, sd.dateTime3(), -Infinity);
    myUtil.fail(t, sd.dateTime3(), new Date("qwerty"));
    myUtil.fail(t, sd.dateTime3(), true);
    myUtil.fail(t, sd.dateTime3(), false);
    myUtil.test(t, sd.dateTime3(), 0, new Date(0));
    myUtil.test(t, sd.dateTime3(), 100, new Date(100));
    myUtil.test(t, sd.dateTime3(), "2018-01-01", new Date("2018-01-01"));

    t.end();
});
