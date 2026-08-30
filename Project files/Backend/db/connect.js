const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGODB_URI;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log(`No connection: ${e}`);
  });
