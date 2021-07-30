import express from "express";
import {BookingDataDao} from "./booking-data-dao/booking.data.dao";
import path from "path";
import csv from "csvtojson";
import {FilterBookingsRequest} from "./booking-data-dao/filter.bookings.request";
import {Utils} from "./utils/utils";

const app = express();
const dao = new BookingDataDao(csv(), path.resolve(__dirname, "..", "data", "historical_data.csv"), new Utils());
const serverErrorMessage = "Internal server error";

app.get("/", async (req, res) => {
    try {
        res.send("Booking data API. Try /venues, /spaces and /bookings");
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
        const venue = req.query.venue ? req.query.venue.toString() : undefined;
        res.json(await dao.listSpacesByVenue(venue));
    } catch (e) {
        res.status(500).send(serverErrorMessage);
    }
})

app.get("/bookings", async (req, res) => {
    try {
        const {status, venue, date} = req.query;
        res.json(await dao.listBookings({status, venue, date} as FilterBookingsRequest));
    } catch (e) {
        res.status(500).send(serverErrorMessage);
    }
})


const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
