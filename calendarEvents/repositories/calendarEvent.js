const moment = require("moment-timezone");
const CalendarEvent = require("../models/calendarEvent");

const findAllFromStartTimeToEndTime = async (from, to) => {
  const calendarEventsFromStartTimeToEndTime = await CalendarEvent.find({
    $or: [
      { startTime: { $gte: from, $lte: to } },
      { endTime: { $gte: from, $lte: to } },
    ],
  });
  return calendarEventsFromStartTimeToEndTime;
};

const findEventsByYear = async (year, timeZone) => {
  const calendarEventsByYear = await CalendarEvent.find({
    $or: [
      {
        $expr: {
          $eq: [
            { $year: { date: "$startTime", timezone: timeZone } },
            parseInt(year),
          ],
        },
      },
      {
        $expr: {
          $eq: [
            { $year: { date: "$endTime", timezone: timeZone } },
            parseInt(year),
          ],
        },
      },
    ],
  });
  return calendarEventsByYear;
};

const findEventsByMonthAndYear = async (year, month, timeZone) => {
  const calendarEventsForMonth = await CalendarEvent.find({
    $or: [
      {
        $expr: {
          $and: [
            {
              $eq: [
                { $year: { date: "$startTime", timezone: timeZone } },
                parseInt(year),
              ],
            },
            {
              $eq: [
                { $month: { date: "$startTime", timezone: timeZone } },
                parseInt(month),
              ],
            },
          ],
        },
      },
      {
        $expr: {
          $and: [
            {
              $eq: [
                { $year: { date: "$endTime", timezone: timeZone } },
                parseInt(year),
              ],
            },
            {
              $eq: [
                { $month: { date: "$endTime", timezone: timeZone } },
                parseInt(month),
              ],
            },
          ],
        },
      },
    ],
  });
  return calendarEventsForMonth;
};

const addOne = async (calendarEventData) => {
  const newCalendarEvent = await CalendarEvent.create(calendarEventData);
  return newCalendarEvent;
};

const updateOne = async (calendarEventId, calendarEventData) => {
  const updatedCalendarEvent = await CalendarEvent.findByIdAndUpdate(
    calendarEventId,
    calendarEventData,
    {
      returnDocument: "after",
    }
  );
  return updatedCalendarEvent;
};

const deleteOne = async (calendarEventId) => {
  await CalendarEvent.findByIdAndDelete(calendarEventId);
};

module.exports = {
  findAllFromStartTimeToEndTime,
  findEventsByYear,
  findEventsByMonthAndYear,
  addOne,
  updateOne,
  deleteOne,
};
