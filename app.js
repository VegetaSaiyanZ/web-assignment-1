const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "conenction error:"));

db.once("open", () => {
    console.log("Connected to the database");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});