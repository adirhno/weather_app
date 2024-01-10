/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const Utilites = require("./Utilites");
const path = require("path");
const City = require("../../models/City");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/weather", { useNewUrlParser: true })
  .then(() => console.log("conneted to DB"))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../node_modules")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/cities/:cityName?", async function (req, res) {
  if (req.params.cityName) {
    const cityData = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${req.params.cityName}&limit=1&appid=2a85932b3a50ff11d09203a545c4d138`
    );
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&appid=2a85932b3a50ff11d09203a545c4d138&units=metric`
    );
    res.send(Utilites.filterData(weatherData.data));
  } else {
    const data = await City.find({});
    res.send(data);
  }
});

app.post("/weather", async function (req, res) {
  let city = req.body;
  const c1 = new City(city);
  c1.save();
  res.send("City added successfuly!");
});

app.delete("/cities/:cityName", async function (req, res) {
  let cityNam = await Utilites.toUpperCaseLetter(req.params.cityName);
  City.findOneAndDelete({ cityName: cityNam })
    .exec()
    .then((d) => console.log(d));
  res.send("City removed successfuly!");
});

const PORT=3000;
app.listen(process.env.PORT || PORT, function () {
  console.log("Server up and running on port 3000");
});
