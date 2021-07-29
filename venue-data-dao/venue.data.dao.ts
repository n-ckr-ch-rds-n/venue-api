import {Booking} from "./booking";
import {Converter} from "csvtojson/v2/Converter";
import {FilterBookingsRequest} from "./filter.bookings.request";

export class VenueDataDao {

    private bookingData: Booking[] | undefined;

    constructor(private converter: Converter, private filePath: string) {
    }

    async listVenues(): Promise<string[]> {
        return this.deDupe((await this.loadBookingData()).map(b => b.venue_name));
    }

    async listSpacesByVenue(venue: string): Promise<string[]> {
        return (await this.listBookingsByVenue(venue))
            .map(v => v.space_name)
            .filter((v, i, a) => i === a.indexOf(v));
    }

    async listBookings(request: FilterBookingsRequest): Promise<Booking[]> {
        return (await this.listBookingsByVenue(request.venue))
            .filter(b => b.status.toLowerCase() === (request.status || b.status).toLowerCase())
            .filter(b => {
                const bookingDate = this.sanitiseDate(b.date);
                return bookingDate === (this.sanitiseDate(request.date) || bookingDate);
            })
    }

    private async listBookingsByVenue(venue?: string): Promise<Booking[]> {
        return (await this.loadBookingData())
            .filter(v => v.venue_name.toLowerCase() === (venue || v.venue_name).toLowerCase());
    }

    private deDupe(values: string[]): string[] {
        return values.filter((v, i, a) => i === a.indexOf(v));
    }

    private sanitiseDate(date: string): number {
        return new Date(date).setHours(0, 0, 0, 0);
    }

    private async loadBookingData(): Promise<Booking[]> {
        this.bookingData = this.bookingData || await this.converter.fromFile(this.filePath);
        return this.bookingData;
    }

}
