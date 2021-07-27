import {Venue} from "./venue";
import {Converter} from "csvtojson/v2/Converter";

export class VenueDataDao {

    constructor(private data: Converter) {
    }

    async listVenues(): Promise<Venue[]> {
        return await this.data || [];
    }
}
