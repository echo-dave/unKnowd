require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(
  morgan(
    ":date[iso] :remote-addr :remote-user :method :status :url HTTP/:http-version :res[content-length] - :response-time ms",
    {
      skip: function(req, res) {
        return res.statusCode <= 200 || res.statusCode === 304;
      }
    }
  )
);
// https redirect
if (process.env.NODE_ENV === "production") {
app.use(function (req, res, next) {
  if (req.header('x-forwarded-proto') === 'http') {
    res.redirect(301, 'https://' + req.hostname + req.url);
    return
  }
  next()
});
}
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

require("./routes/api-routes.js")(app, io);

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client/build")));
}

// Send every other request to the React app
// Define any API routes before this runs
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

http.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}! \n node env: ${process.env.NODE_ENV}`);
});
