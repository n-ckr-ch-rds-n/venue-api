import {Venue} from "./venue";
import {Converter} from "csvtojson/v2/Converter";

export class VenueDataDao {

    private venueData: Venue[] | undefined;

    constructor(private converter: Converter, private filePath: string) {
    }

    async listVenues(): Promise<Venue[]> {
        return await this.loadVenueData();
    }

    async listSpacesByVenue(venue: string): Promise<string[]> {
        return (await this.loadVenueData())
            .filter(v => v.venue_name === venue)
            .map(v => v.space_name)
            .filter((v, i, a) => i === a.indexOf(v));
    }

    private async loadVenueData(): Promise<Venue[]> {
        this.venueData = this.venueData || await this.converter.fromFile(this.filePath);
        return this.venueData;
    }

}
