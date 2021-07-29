import {Booking} from "./booking";
import {Converter} from "csvtojson/v2/Converter";
import {FilterBookingsRequest} from "./filter.bookings.request";
import {Utils} from "../utils/utils";

export class BookingDataDao {

    private bookingData: Booking[] | undefined;

    constructor(private converter: Converter, private filePath: string, private utils: Utils) {
    }

    async listVenues(): Promise<string[]> {
        return this.utils.deDupe((await this.loadBookingData()).map(b => b.venue_name));
    }

    async listSpacesByVenue(venue: string): Promise<string[]> {
        return this.utils.deDupe((await this.listBookingsByVenue(venue)).map(b => b.space_name))
    }

    async listBookings(request: FilterBookingsRequest): Promise<Booking[]> {
        return (await this.listBookingsByVenue(request.venue))
            .filter(b => this.utils.stringEquals(b.status, (request.status || b.status)))
            .filter(b => this.utils.dateEquals(b.date, request.date))
    }

    private async listBookingsByVenue(venue?: string): Promise<Booking[]> {
        return (await this.loadBookingData())
            .filter(b => this.utils.stringEquals(b.venue_name, venue || b.venue_name))
    }

    private async loadBookingData(): Promise<Booking[]> {
        this.bookingData = this.bookingData || await this.converter.fromFile(this.filePath);
        return this.bookingData;
    }

}
