import {Utils} from "./utils";

describe("Utils", () => {
    let utils: Utils;

    beforeEach(() => {
        utils = new Utils();
    })

    test("Dedupes arrays", () => {
        const dupedValue = "foo";
        const deDuped = utils.deDupe([dupedValue, dupedValue, dupedValue]);
        expect(deDuped.filter(i => i === dupedValue).length).toBe(1);
    })

    test("Marks strings equal if they have the same characters regardless of case", () => {
        expect(utils.stringEquals("FOO", "foo")).toBe(true);
    })

    test("Marks dates equal if they are on the same day but separated by clock time", () => {
        const date1 = new Date().setHours(0, 0, 0, 0);
        const date2 = date1 + 15;
        expect(utils.dateEquals(date1, date2)).toBe(true);
    })

})
