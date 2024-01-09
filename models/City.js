/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  cityName: String,
  temp: Number,
  description: String,
  icon: String,
  active:{ type: Boolean, default: false }
});

const City = mongoose.model("City", citySchema);
module.exports = City;
