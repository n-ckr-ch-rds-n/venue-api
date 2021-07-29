import express from "express";
import {BookingDataDao} from "./booking-data-dao/booking.data.dao";
import path from "path";
import csv from "csvtojson";
import {FilterBookingsRequest} from "./booking-data-dao/filter.bookings.request";
import {Utils} from "./utils/utils";

const app = express();
const dao = new BookingDataDao(csv(), path.resolve(__dirname, "..", "data", "historical_data.csv"), new Utils());

app.get("/", async (req, res) => {
    res.send("Booking data API");
})

app.get("/venues", async (req, res) => {
    res.send(await dao.listVenues());
})

app.get("/spaces", async (req, res) => {
    const venue = req.query.venue ? req.query.venue.toString() : undefined;
    res.send(await dao.listSpacesByVenue(venue));
})

app.get("/bookings", async (req, res) => {
    const {status, venue, date} = req.query;
    res.send(await dao.listBookings({status, venue, date} as FilterBookingsRequest));
})


const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
