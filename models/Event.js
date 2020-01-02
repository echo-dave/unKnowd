const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  lat: Number,
  lon: Number,
  date: {
    start: Date,
    end: Date
  },
  name: String,
  description: String,
  img: String,
  private: Boolean
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
