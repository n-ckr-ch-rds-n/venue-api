import {Venue} from "./venue";
import {Converter} from "csvtojson/v2/Converter";

export class VenueDataDao {

    private venueData: Venue[] | undefined;

    constructor(private converter: Converter, private filePath: string) {
    }

    async listVenues(): Promise<Venue[]> {
        this.venueData = this.venueData || await this.converter.fromFile(this.filePath);
        return this.venueData;
    }

}
