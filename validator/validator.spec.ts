import {Validator} from "./validator";

describe("Validator", () => {

    test("Marks input valid if undefined", () => {
        expect(Validator.isStringOrUndefined(undefined)).toBe(true);
    })

    test("Marks input valid if string", () => {
        expect(Validator.isStringOrUndefined("foobar")).toBe(true);
    })

    test("Marks input invalid if not string or undefined", () => {
        expect(Validator.isStringOrUndefined(12345)).toBe(false);
        expect(Validator.isStringOrUndefined({foo: "bar"})).toBe(false);
    })
})
