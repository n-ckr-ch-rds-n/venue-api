import express from "express";
import {BookingDataDao} from "./booking-data-dao/booking.data.dao";
import path from "path";
import csv from "csvtojson";
import {FilterBookingsRequest} from "./booking-data-dao/filter.bookings.request";
import {Utils} from "./utils/utils";
import {Validator} from "./validator/validator";

const app = express();
const dao = new BookingDataDao(csv(), path.resolve(__dirname, "..", "data", "historical_data.csv"), new Utils());
const serverErrorMessage = "Internal server error";
const badRequestMessage = "Bad request";

app.get("/", async (req, res) => {
    try {
        res.send("Booking data API. Try /venues, /spaces?venue={venue} or /bookings?status={status}&date={date}&venue={venue}");
    } catch (e) {
        res.status(500).send(serverErrorMessage);
    }
})

app.get("/venues", async (req, res) => {
    try {
        res.json(await dao.listVenues());
    } catch (e) {
        res.status(500).send(serverErrorMessage);
    }
})

app.get("/spaces", async (req, res) => {
    try {
        const venue = req.query.venue;
        if (Validator.isStringOrUndefined(venue)) {
            res.json(await dao.listSpacesByVenue(venue as string));
        } else {
            res.status(400).send(badRequestMessage);
        }
    } catch (e) {
        res.status(500).send(serverErrorMessage);
    }
})

app.get("/bookings", async (req, res) => {
    try {
        const {status, venue, date} = req.query;
        const request = {status, venue, date};
        if (Validator.isValidBookingFilterRequest(request)) {
            res.json(await dao.listBookings(request as FilterBookingsRequest));
        } else {
            res.status(400).send(badRequestMessage);
        }
    } catch (e) {
        res.status(500).send(serverErrorMessage);
    }
})


const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
