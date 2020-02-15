const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  lat: String,
  lon: String,
  date: {
    start: { type: Date, default: "" },
    lastEdit: {type: Date, default: null}
  },
  title: String,
  description: String,
  address: String,
  img: String,
  private: { type: Boolean, default: false },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  replies: [
    {
      creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      photos: String,
      msg: String,
      dateCreated: Date,
      commentId: String
    }
  ]
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
