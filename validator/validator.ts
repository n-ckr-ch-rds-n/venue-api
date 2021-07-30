import {BookingStatus} from "../booking-data-dao/booking.status";

export class Validator {

    static isStringOrUndefined(input: any): boolean {
        return !input || typeof input === "string";
    }

    static isValidStatusInput(input: any): boolean {
        return !input || Object.values(BookingStatus).includes(input);
    }

    static isValidDateInput(input: any): boolean {
        const time = new Date(input).getTime();
        return !input || !(Number.isNaN(time));
    }

    static isValidBookingFilterRequest(input: {status: any, venue: any, date: any}): boolean {
        return this.isStringOrUndefined(input.venue)
            && this.isValidStatusInput(input.status)
            && this.isValidDateInput(input.date);
    }

}
