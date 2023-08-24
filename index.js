const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/database");
const calendarEventRoutes = require("./calendarEvents/routes");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

connectToDB().then(() => {
  app.use("/calendarEvents", calendarEventRoutes);

  app.get("/", (req, res) => {
    res.send("Hello World!!!!!!!!");
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
