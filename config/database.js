const mongoose = require("mongoose");

async function connectToDB() {
  console.log("connectiong to db");
  await mongoose.connect("mongodb://127.0.0.1:27017/calendar-app-db");
  console.log("connected to db");
}

module.exports = {
  connectToDB,
};
