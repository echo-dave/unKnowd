const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MarkerSchema = new Schema({
    name: String,
    position: {
        lat: Number,
        lng: Number
    }
});

const Marker = mongoose.model("Marker", MarkerSchema);
module.exports = Marker;