require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongodbConnString = process.env.MONGODB_URI;

const app = express();

// parse json
app.use(express.json());

// mongodb connection

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongodbConnString);
  console.log("Connected to MongoDB");
}

// end mongoDB connection

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log(`Server is listening at port 3000`);
});
