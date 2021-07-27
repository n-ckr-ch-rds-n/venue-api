import {VenueDataDao} from "./venue.data.dao";
import path from "path";
import csv from "csvtojson";

describe("Venue data dao", () => {
    let dao: VenueDataDao;

    beforeEach(() => {
        const filePath = path.resolve(__dirname, "../data/historical_data.csv");
        dao = new VenueDataDao(csv(), filePath);
    });

    test("Lists venues", async () => {
        const venues = await dao.listVenues();
        expect(venues.length > 0).toBe(true);
    });

})
