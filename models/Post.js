const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  msg: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateCreated: Date,
  lastEdit: {type: Date, default: null},
  photos: Array,
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

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

//[0]   replies: [PostSchema]
