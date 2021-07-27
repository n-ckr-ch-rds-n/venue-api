import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Hi friends!");
})

const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
