const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  lat: String,
  lon: String,
  date: {
    start: { type: Date, default: "" },
    end: { type: Date, default: "" }
  },
  title: String,
  description: String,
  address: String,
  img: String,
  private: Boolean,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
