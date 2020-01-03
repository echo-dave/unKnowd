// const db = require("../models");
const path = require("path");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authWare = require("../middleware/authware");

// const cloud = require("../nodejs/cloudinaryUp");

module.exports = function(app) {
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
      res.json(dbUser);
    });
  });
};
