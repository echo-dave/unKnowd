// const db = require("../models");
const path = require("path");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authWare = require("../middleware/authware");
// const socketIOClient = require("socket.io-client");
// const socket = socketIOClient("http://127.0.0.1:3001");

// const cloud = require("../nodejs/cloudinaryUp");

module.exports = function(app, socket) {
  app.post("/api/signup", function(req, res) {
    User.create(req.body)
      .then(function(result) {
        res.json({ message: "user created" });
      })
      .catch(function(err) {
        res.status(500).json({ error: err.message });
      });
  });

  app.post("/api/authenticate", function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email }).then(function(dbUser) {
      if (!dbUser)
        return res
          .status(401)
          .json({ message: "email or password is incorrect" });
      if (dbUser.comparePassword(password)) {
        const token = jwt.sign(
          {
            data: dbUser._id
          },
          "superSecretKey"
        );

        res.json({
          id: dbUser._id,
          email: dbUser.email,
          token: token
        });
        console.log(email);
      } else {
        res.status(401).json({ message: "email or password incorrect" });
      }
    });
  });

  app.get("/api/protected", authWare, function(req, res) {
    const user = req.user;
    res.json({
      message:
        user.email + ", you should only see this if you're authenticated."
    });
  });

  app.get("/api/public", function(req, res) {
    res.json({
      message: "this is available for everyone"
    });
  });

  app.get("/api/me", authWare, function(req, res) {
    User.findById(req.user._id).then(dbUser => {
      dbUser = {
        id: dbUser._id,
        firstName: dbUser.firstName
      };
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  app.get("/api/posts", function(req, res) {
    db.Post.find()
      .sort({ dateCreated: -1 })
      .limit(20)
      .populate("creator")
      .then(posts => {
        res.json(posts);
      })
      .catch(err => console.log(err));
  });
  app.post("/api/post", function(req, res) {
    db.Post.create(req.body).then(function(data) {
      console.log(data);
      socket.emit("new post", data);
      res.end();
      // res.json(data);
    });
  });

  app.get("/api/events", function(req, res) {
    let currentDate = new Date();
    console.log(currentDate);
    db.Event.find({
      "date.end": { $gt: currentDate }
    }).then(events => {
      res.json(events);
    });
  });

  //we need to have the user _id to insert into the event as well as getting the user name and user photo from the User collection
  app.post("/api/event", function(req, res) {
    db.Event.create()
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};
