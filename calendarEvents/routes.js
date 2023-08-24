const express = require("express");
const moment = require("moment-timezone");
const router = express.Router();
const { calendarEventRepository } = require("./repositories");

router.get("/", async (req, res) => {
  const { from, to } = req.query;
  const foundEventsFromStartTimeToEndTime =
    await calendarEventRepository.findAllFromStartTimeToEndTime(from, to);
  res.send(foundEventsFromStartTimeToEndTime);
});

router.get("/:year", async (req, res) => {
  console.log("GET events for a specific year");
  const { timeZone } = req.query;
  const { year } = req.params;
  const eventsForYear = await calendarEventRepository.findEventsByYear(
    year,
    timeZone
  );
  res.send(eventsForYear);
});

router.get("/:year/:month", async (req, res) => {
  console.log("GET events for a specific month");
  const { month } = req.params;
  const { timeZone } = req.query;
  const { year } = req.params;
  const eventsForMonth = await calendarEventRepository.findEventsByMonthAndYear(
    year,
    month,
    timeZone
  );
  res.send(eventsForMonth);
});

router.post("/", async (req, res) => {
  const newEvent = await calendarEventRepository.addOne(req.body);
  res.send(newEvent);
});

router.patch("/:calendarEventId", async (req, res) => {
  const { calendarEventId } = req.params;
  const updatedEvent = await calendarEventRepository.updateOne(
    calendarEventId,
    req.body
  );
  res.send(updatedEvent);
});

router.delete("/:calendarEventId", async (req, res) => {
  const { calendarEventId } = req.params;
  await calendarEventRepository.deleteOne(calendarEventId);
  res.send(200);
});

module.exports = router;
