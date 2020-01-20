require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// io.on("connection", function(socket) {
//   console.log("a user connected");
//   // Define API routes here

//   socket.on("disconnect", () => console.log("user disconnected"));
// });

require("./routes/api-routes.js")(app, io);

// Mongoose
const mongoose = require("mongoose");
db = require("./models");
mongoose.Promise = Promise;
const mongoUrl = process.env.MONGODB_URI;
mongoose.set("useCreateIndex", true);
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Send every other request to the React app
// Define any API routes before this runs
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

http.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
