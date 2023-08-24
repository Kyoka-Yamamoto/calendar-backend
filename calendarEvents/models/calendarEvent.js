const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: String,
  description: String,
});

const CalendarEvent = mongoose.model("CalendarEvent", CalendarEventSchema);

module.exports = CalendarEvent;
