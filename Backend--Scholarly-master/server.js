// set up backend and install dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); //for json payloads to javascript objects in req.body
app.use(express.urlencoded({ extended: true })); //from form data payloads to javascript objects in req.body
app.use("/", routes);
//const encodedPassword = encodeURIComponent("TheWeeknd8@");
const connectionString = `mongodb+srv://<username>charu_jain_2290:<password>mait123@cluster0.lmmqyju.mongodb.net/`;
mongoose.connect(connectionString).then(
  app.listen(port, () => {
    console.log(`server is started at http://localhost:${port}`);
  })
);
