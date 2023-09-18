require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongodbConnString = process.env.MONGODB_URI;

const app = express();

// parse json
app.use(express.json());

// mongodb connection

mongoose.connect(mongodbConnString);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});

db.once("connected", () => {
  console.log(`Database connected`);
});

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log(`Server is listening at port 3000`);
});
