const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(`${process.env.MONGODBAT_URI}`)
  .then(() => console.log("Database Connected Mongo Atlas"));

module.exports = connection;
