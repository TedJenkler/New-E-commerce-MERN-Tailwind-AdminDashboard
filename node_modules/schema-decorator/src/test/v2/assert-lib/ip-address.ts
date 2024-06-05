import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-ipV4OctetString", (t) => {
    const f = sd.ipV4OctetString();
    for (let i=0; i<=255; ++i) {
        //Normal cases
        myUtil.test(t, f, i, i.toString());
        myUtil.test(t, f, i.toString(), i.toString());
        //Weird case
        myUtil.test(t, f, ` 0${i} `, i.toString());
    }
    for (let i=256; i<260; ++i) {
        myUtil.fail(t, f, i);
        myUtil.fail(t, f, i.toString());
        myUtil.fail(t, f, ` 0${i} `);
    }
    for (let i=-10; i<0; ++i) {
        myUtil.fail(t, f, i);
        myUtil.fail(t, f, i.toString());
        myUtil.fail(t, f, ` ${i} `);
    }

    t.end();
});

tape(__filename + "-ipV4String", (t) => {
    const f = sd.ipV4String();

    myUtil.test(t, f, `127.0.0.1`, `127.0.0.1`);
    myUtil.test(t, f, `  127     . 0   . 0  . 1  `, `127.0.0.1`);
    myUtil.test(t, f, `255.255.255.255`, `255.255.255.255`);
    myUtil.test(t, f, `0.0.0.0`, `0.0.0.0`);

    myUtil.fail(t, f, `0.0.0.-1`);
    myUtil.fail(t, f, `0.0.0`);
    myUtil.fail(t, f, `0.0.0.0.0`);

    t.end();
});

function zeroPadLeft (str : string, length : number) {
    if (str.length >= length) {
        return str;
    }
    return "0".repeat(length - str.length) + str;
}
tape(__filename + "-ipV6SegmentString", (t) => {
    const f = sd.ipV6SegmentString();

    const hexUpper = [
        "0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9", "A", "B",
        "C", "D", "E", "F",
    ];

    //Zero-character
    myUtil.fail(t, f, "");

    //Single-character
    for (let hex of hexUpper) {
        for (let length=1; length<=4; ++length) {
            myUtil.test(t, f, zeroPadLeft(hex, length), hex.toLowerCase());
            myUtil.test(t, f, zeroPadLeft(hex.toLowerCase(), length), hex.toLowerCase());
        }
    }

    //Double-character
    for (let hex of hexUpper) {
        const hex2 = "A" + hex;
        for (let length=2; length<=4; ++length) {
            myUtil.test(t, f, zeroPadLeft(hex2, length), hex2.toLowerCase());
            myUtil.test(t, f, zeroPadLeft(hex2.toLowerCase(), length), hex2.toLowerCase());
        }
    }

    //Triple-character
    for (let hex of hexUpper) {
        const hex3 = "Aa" + hex;
        for (let length=3; length<=4; ++length) {
            myUtil.test(t, f, zeroPadLeft(hex3, length), hex3.toLowerCase());
            myUtil.test(t, f, zeroPadLeft(hex3.toLowerCase(), length), hex3.toLowerCase());
        }
    }

    //Quadruple-character
    for (let hex of hexUpper) {
        const hex4 = "AaA" + hex;
        myUtil.test(t, f, hex4, hex4.toLowerCase());
        myUtil.test(t, f, hex4.toLowerCase(), hex4.toLowerCase());
    }

    //Quintiple-character
    myUtil.fail(t, f, "aaaaa");
    myUtil.fail(t, f, "00000");

    t.end();
});

tape(__filename + "-ipV6String", (t) => {
    const f = sd.ipV6String();

    myUtil.test(t, f, "2001:db8:0:0:1:0:0:1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:0db8:0:0:1:0:0:1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:db8::1:0:0:1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:db8::0:1:0:0:1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:0db8::1:0:0:1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:db8:0:0:1::1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:db8:0000:0:1::1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:DB8:0:0:1::1", "2001:db8::1:0:0:1");

    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:0001", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");
    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:001", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");
    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:01", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");
    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");

    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd::1", "2001:db8:aaaa:bbbb:cccc:dddd:0:1");
    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:0:1", "2001:db8:aaaa:bbbb:cccc:dddd:0:1");

    myUtil.test(t, f, "2001:db8:0:0:0::1", "2001:db8::1");
    myUtil.test(t, f, "2001:db8:0:0::1", "2001:db8::1");
    myUtil.test(t, f, "2001:db8:0::1", "2001:db8::1");
    myUtil.test(t, f, "2001:db8::1", "2001:db8::1");

    myUtil.test(t, f, "2001:db8::aaaa:0:0:1", "2001:db8::aaaa:0:0:1");
    myUtil.test(t, f, "2001:db8:0:0:aaaa::1", "2001:db8::aaaa:0:0:1");

    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa");
    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:AAAA", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa");
    myUtil.test(t, f, "2001:db8:aaaa:bbbb:cccc:dddd:eeee:AaAa", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa");

    myUtil.test(t, f, "2001:0db8:0000:0000:1111:2222:3333:4444", "2001:db8::1111:2222:3333:4444");

    myUtil.test(t, f, "2001:db8::1", "2001:db8::1");
    myUtil.test(t, f, "2001:0db8:0000:0000:0000:0000:0000:0001", "2001:db8::1");
    myUtil.test(t, f, "2001:0db8:0::1", "2001:db8::1");

    myUtil.test(t, f, "2001:db8:0:0:1:0:0:1", "2001:db8::1:0:0:1");
    myUtil.test(t, f, "2001:DB8::1:0:0:1", "2001:db8::1:0:0:1");

    myUtil.test(t, f, "2001:db8:0:1::1", "2001:db8:0:1::1");
    myUtil.test(t, f, "2001:db8::1:0:0:0:1", "2001:db8:0:1::1");

    myUtil.test(t, f, "2001:db8::1:0:1", "2001:db8::1:0:1");
    myUtil.test(t, f, "2001:db8:1::0:1", "2001:db8:1::1");

    myUtil.test(t, f, "2001:0db8::0001", "2001:db8::1");

    myUtil.test(t, f, "2001:db8:0:0:0:0:2:1", "2001:db8::2:1");
    myUtil.test(t, f, "2001:db8::0:1", "2001:db8::1");

    myUtil.test(t, f, "2001:db8::1:1:1:1:1", "2001:db8:0:1:1:1:1:1");

    myUtil.test(t, f, "2001:0:0:1:0:0:0:1", "2001:0:0:1::1");

    myUtil.test(t, f, "2001:db8:0:0:1:0:0:1", "2001:db8::1:0:0:1");

    myUtil.test(t, f, "::ffff", "::ffff");
    myUtil.test(t, f, "::", "::");
    myUtil.test(t, f, "ffff::", "ffff::");

    t.end();
});

tape(__filename + "-ipV4MappedIpV6String", (t) => {
    const f = sd.ipV4MappedIpV6String();

    myUtil.test(t, f, "::ffff:192.0.2.128", "::ffff:192.0.2.128");
    myUtil.test(t, f, "::192.0.2.128", "::192.0.2.128");
    myUtil.test(t, f, "ffff::192.0.2.128", "ffff::192.0.2.128");

    myUtil.test(t, f, "0:0:0:0:0:ffff:192.0.2.1", "::ffff:192.0.2.1");

    myUtil.test(t, f, "1:1:1:0::127.0.0.1", "1:1:1::127.0.0.1");
    myUtil.test(t, f, "1:1:1::127.0.0.1", "1:1:1::127.0.0.1");
    myUtil.test(t, f, "1:1:1:1::127.0.0.1", "1:1:1:1::127.0.0.1");
    myUtil.test(t, f, "1:1:1:1:1::127.0.0.1", "1:1:1:1:1:0:127.0.0.1");
    myUtil.fail(t, f, "1:1:1:1:1:1::127.0.0.1");
    myUtil.fail(t, f, "1:1:1:1:1:0::127.0.0.1");
    myUtil.fail(t, f, "1:1:1:1:1:1:1:127.0.0.1");
    myUtil.test(t, f, "1:1:1:1:1:1:127.0.0.1", "1:1:1:1:1:1:127.0.0.1");

    myUtil.test(t, f, "1:1:1:1::1:127.0.0.2", "1:1:1:1:0:1:127.0.0.2");

    t.end();
});