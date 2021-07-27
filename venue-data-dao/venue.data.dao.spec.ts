import {VenueDataDao} from "./venue.data.dao";
import path from "path";

describe("Venue data dao", () => {
    let dao: VenueDataDao;

    beforeEach(() => {
        dao = new VenueDataDao();
    });

    test("Loads data from CSV", async () => {
       await dao.loadFromFilePath(path.resolve(__dirname, "../data/historical_data.csv"));
       expect(dao.listVenues().length > 0).toBe(true);
    });

})
