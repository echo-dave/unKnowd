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
  private: Boolean,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
