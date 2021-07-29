import {Booking} from "./booking";
import {Converter} from "csvtojson/v2/Converter";
import {BookingStatus} from "./booking.status";
import {FilterBookingsRequest} from "./filter.bookings.request";

export class VenueDataDao {

    private venueData: Booking[] | undefined;

    constructor(private converter: Converter, private filePath: string) {
    }

    async listBookingsByVenue(venue?: string): Promise<Booking[]> {
        return (await this.loadBookingData())
            .filter(v => v.venue_name.toLowerCase() === (venue || v.venue_name).toLowerCase());
    }

    async listSpacesByVenue(venue: string): Promise<string[]> {
        return (await this.listBookingsByVenue(venue))
            .map(v => v.space_name)
            .filter((v, i, a) => i === a.indexOf(v));
    }

    async listBookingsByStatus(request: FilterBookingsRequest): Promise<Booking[]> {
        return (await this.listBookingsByVenue(request.venue))
            .filter(v => v.status === (request.status || v.status))
            .filter(b => this.normaliseDate(b.date) === this.normaliseDate(request.date))
    }

    private normaliseDate(date: string): number {
        return new Date(date).setHours(0, 0, 0, 0);
    }

    private async loadBookingData(): Promise<Booking[]> {
        this.venueData = this.venueData || await this.converter.fromFile(this.filePath);
        return this.venueData;
    }

}
