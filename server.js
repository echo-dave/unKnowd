require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var databaseUrl = "unKowd";
var collections = ["events"];
var mongojs = require("mongojs");
var model = require("./models/Event");

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/api/all", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  model.find({}, function(err, data) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    } else {
      // Otherwise, send the result of this query to the browser
      res.json(data);
    }
  });
});

// Mongoose
const mongoose = require("mongoose");
db = require("./models");
mongoose.Promise = Promise;
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
require("./routes/api-routes.js")(app);
// Send every other request to the React app
// Define any API routes before this runs
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
