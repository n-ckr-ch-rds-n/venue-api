import {Venue} from "./venue";
import csv from "csvtojson";

export class VenueDataDao {

    private venueData: Venue[] | undefined;

    constructor() {
    }

    async loadFromFilePath(filePath: string): Promise<void> {
        this.venueData = await csv().fromFile(filePath);
    }

    listVenues(): Venue[] {
        return this.venueData || [];
    }
}
