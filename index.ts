import express from "express";
import {VenueDataDao} from "./venue-data-dao/venue.data.dao";
import path from "path";
import csv from "csvtojson";

const app = express();
const dao = new VenueDataDao(csv(), path.resolve(__dirname, "..", "data", "historical_data.csv"));

app.get("/", async (req, res) => {
    const venues = await dao.listVenues();
    res.send(venues);
})

app.get("/spaces", async (req, res) => {
    const spaces = await dao.listSpacesByVenue(req.query.venue as string);
    res.send(spaces);
})


const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
