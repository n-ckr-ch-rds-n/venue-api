import {BookingDataDao} from "./booking.data.dao";
import {Converter} from "csvtojson/v2/Converter";
import {Booking} from "./booking";
import {BookingStatus} from "./booking.status";

describe("Venue data dao", () => {
    let dao: BookingDataDao;
    let mockConverter: Converter;
    let mockData: Booking[];
    let mockBooking1: Booking;
    let mockBooking2: Booking;

    beforeEach(() => {
        mockBooking1 = {
            date: "2019-04-06T09:39:23Z",
            venue_name: "Cool venue",
            space_name: "Outer space",
            guest_name: "John Smith",
            guest_email: "foo@bar.com",
            number_of_guests: 10,
            price: "£7.60",
            status: BookingStatus.Pending
        };
        mockBooking2 = {
            date: "2019-02-28T14:18:30Z",
            venue_name: "Boring venue",
            space_name: "3D space",
            guest_name: "Jane Gordon",
            guest_email: "baz@bar.com",
            number_of_guests: 8,
            price: "£3.89",
            status: BookingStatus.Completed
        };
        mockData = [mockBooking1, mockBooking2];
        mockConverter = {
            fromFile: async (filePath: string) => mockData
        } as any as Converter;
        dao = new BookingDataDao(mockConverter, "foobar");
    });

    test("Lists venues", async () => {
        const venues = await dao.listVenues();
        for (const name of [mockBooking1.venue_name, mockBooking2.venue_name]) {
            expect(venues.includes(name)).toBe(true);
        }
    });
    //
    // test("Lists spaces by venue", async () => {
    //     const spaces = await dao.listSpacesByVenue("Fulham Palace");
    //     expect(spaces.length > 0).toBe(true);
    // })

})
