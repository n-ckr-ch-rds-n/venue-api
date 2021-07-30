import {Validator} from "./validator";
import {BookingStatus} from "../booking-data-dao/booking.status";

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

    test("Validates booking filter requests", () => {
        const request = {date: new Date(), status: BookingStatus.Completed, venue: "bar"};
        expect(Validator.isValidBookingFilterRequest(request)).toBe(true);
    })

    test("Marks filter requests invalid if date invalid", () => {
        const badRequest = {date: {foo: "bar"}, status: BookingStatus.Pending, venue: "foo"};
        expect(Validator.isValidBookingFilterRequest(badRequest)).toBe(false);
    })

    test("Marks filter requests invalid if status invalid", () => {
        const badRequest = {date: new Date(), status: "baz", venue: "baz"};
        expect(Validator.isValidBookingFilterRequest(badRequest)).toBe(false);
    })
})
