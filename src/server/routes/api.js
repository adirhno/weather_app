const express = require("express");
const router = express.Router();
const City = require("../models/City");
const Utilites = require("../Utilites");
const axios = require("axios");

router.get("/:cityName?", async function (req, res) {
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

router.post("/", async function (req, res) {
	let city = req.body;
	const c1 = new City(city);
	c1.save();
	res.send("City added successfuly!");
});

router.delete("/:cityName", async function (req, res) {
	let cityNam = await Utilites.toUpperCaseLetter(req.params.cityName);
	City.findOneAndDelete({ cityName: cityNam })
		.exec()
		.then((d) => console.log(d));
	res.send("City removed successfuly!");
});

module.exports = router;
