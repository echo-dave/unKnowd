const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  msg: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateCreated: Date,
  photos: Array,
  replies: Array
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

//[0]   replies: [PostSchema]
