/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./routes/api");

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/weather", {
		useNewUrlParser: true,
	})
	.then(() => console.log("conneted to DB"))
	.catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../node_modules")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/cities", api);

const PORT = 3000;
app.listen(process.env.PORT || PORT, function () {
	console.log("Server up and running on port 3000");
});
