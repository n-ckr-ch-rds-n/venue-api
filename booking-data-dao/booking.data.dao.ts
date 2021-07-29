import {Booking} from "./booking";
import {Converter} from "csvtojson/v2/Converter";
import {FilterBookingsRequest} from "./filter.bookings.request";

export class BookingDataDao {

    private bookingData: Booking[] | undefined;

    constructor(private converter: Converter, private filePath: string) {
    }

    async listVenues(): Promise<string[]> {
        return this.deDupe((await this.loadBookingData()).map(b => b.venue_name));
    }

    async listSpacesByVenue(venue: string): Promise<string[]> {
        return this.deDupe((await this.listBookingsByVenue(venue)).map(b => b.space_name))
    }

    async listBookings(request: FilterBookingsRequest): Promise<Booking[]> {
        return (await this.listBookingsByVenue(request.venue))
            .filter(b => this.stringEquals(b.status, (request.status || b.status)))
            .filter(b => this.dateEquals(b.date, request.date))
    }

    private dateEquals(val1: any, val2: any): boolean {
        return this.sanitiseDate(val1) === this.sanitiseDate(val2);
    }

    private async listBookingsByVenue(venue?: string): Promise<Booking[]> {
        return (await this.loadBookingData())
            .filter(b => this.stringEquals(b.venue_name, venue || b.venue_name))
    }

    private deDupe(values: string[]): string[] {
        return values.filter((v, i, a) => i === a.indexOf(v));
    }

    private sanitiseDate(date: string | number): number {
        return new Date(date).setHours(0, 0, 0, 0);
    }

    private stringEquals(string1: string, string2: string): boolean {
        return string1.toLowerCase() === string2.toLowerCase();
    }

    private async loadBookingData(): Promise<Booking[]> {
        this.bookingData = this.bookingData || await this.converter.fromFile(this.filePath);
        return this.bookingData;
    }

}
