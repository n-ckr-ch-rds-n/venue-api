import {Venue} from "./venue";
import {Converter} from "csvtojson/v2/Converter";
import {BookingStatus} from "./booking.status";
import {FilterBookingsRequest} from "./filter.bookings.request";

export class VenueDataDao {

    private venueData: Venue[] | undefined;

    constructor(private converter: Converter, private filePath: string) {
    }

    async listVenues(venue?: string): Promise<Venue[]> {
        return (await this.loadBookingData())
            .filter(v => v.venue_name.toLowerCase() === (venue || v.venue_name).toLowerCase());
    }

    async listSpacesByVenue(venue: string): Promise<string[]> {
        return (await this.listVenues(venue))
            .map(v => v.space_name)
            .filter((v, i, a) => i === a.indexOf(v));
    }

    async listBookingsByStatus(request: FilterBookingsRequest): Promise<Venue[]> {
        return (await this.listVenues(request.venue))
            .filter(v => v.status === (request.status || v.status))
    }

    private async loadBookingData(): Promise<Venue[]> {
        this.venueData = this.venueData || await this.converter.fromFile(this.filePath);
        return this.venueData;
    }

}
