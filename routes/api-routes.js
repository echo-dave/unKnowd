const db = require("../models");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authWare = require("../middleware/authware");
// const socketIOClient = require("socket.io-client");
// const socket = socketIOClient("http://127.0.0.1:3001");
const upload = require("../nodejs/upload");
const bcrypt = require("bcryptjs");
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_GEOCODE,
  Promise: Promise
});

module.exports = function(app, io) {
  app.post("/api/signup", function(req, res) {
    console.log("signup body", req.body, req.files);

    if (req.files != null) {
      console.log("file--------------file");
      // console.log(req.files);

      upload(req, "photo", signup);
    } else {
      signup(req);
    }

    function signup(req) {
      User.create(req.body)
        .then(function(result) {
          if (result._id) {
            console.log(result);

            res.json({ message: "user created", user: result._id });
          }
        })
        .catch(function(err) {
          if (err.code === 11000)
            res.status(500).json({ error: "email in use" });
          else {
            res.status(500).json({ error: err.errmsg });
          }
          console.log(err);
        });
    }
  });

  app.post("/api/authenticate", function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then(function(dbUser) {
        if (!dbUser) {
          res.status(401).json({ msg: "email or password is incorrect" });
        }
        if (dbUser.comparePassword(password)) {
          const token = jwt.sign(
            {
              data: dbUser._id
            },
            process.env.SECRET
          );

          res.json({
            id: dbUser._id,
            email: dbUser.email,
            token: token
          });
          console.log(email);
        } else {
          res.status(401).json({ msg: "email or password incorrect" });
        }
      })
      .catch(err => console.log(err));
  });

  app.get("/api/protected", authWare, function(req, res) {
    const user = req.user;
    res.json({
      message:
        user.email + ", you should only see this if you're authenticated."
    });
  });

  app.get("/api/me", authWare, function(req, res) {
    User.findById(req.user._id).then(dbUser => {
      dbUser = {
        id: dbUser._id,
        firstName: dbUser.firstName,
        photo: dbUser.photo
      };
      res.json(dbUser);
    });
  });

  app.get("/api/posts", function(req, res) {
    db.Post.find()
      .sort({ dateCreated: -1 })
      .limit(20)
      .populate("creator")
      .populate("replies.creator")
      .lean()
      .then(posts => {
        for (let i = 0; i < posts.length; i++) {
          delete posts[i].creator.email;
          delete posts[i].creator.password;
          delete posts[i].creator.lastName;
          for (let j = 0; j < posts[i].replies.length; j++) {
            delete posts[i].replies[j].creator.email;
            delete posts[i].replies[j].creator.password;
            delete posts[i].replies[j].creator.lastName;
          }
        }

        res.json(posts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  app.post("/api/post", function(req, res) {
    console.log(req.body);

    if (req.files != null) {
      console.log("file--------------file");
      console.log(req.files);

      upload(req, "photos", newPost);
    } else {
      newPost(req);
    }

    function newPost(req) {
      db.Post.create(req.body).then(function(data) {
        data
          .populate("creator")
          .execPopulate()
          .then(populatedData => {
            io.sockets.emit("new post", populatedData);
            res.end();
          })
          .catch(err => res.status(500).json({ error: err.message }));
      });
    }
  });

  app.get("/api/maps", function(req, res) {
    let currentDate = new Date();
    // console.log(currentDate);
    db.Event.find({
      "date.start": { $gte: new Date(currentDate) }
    })
      .then(mapEvents => res.json(mapEvents))
      .catch(err => {
        console.log(err);
        res.json(err.response);
      });
  });

  app.get("/api/events", function(req, res) {
    let currentDate = new Date();
    // console.log(currentDate);
    db.Event.find({
      "date.start": { $gte: new Date(currentDate) }
    })
      .sort({ "date.start": 1 })
      .populate("creator")
      .populate("replies.creator")
      .lean()
      .then(events => {
        for (let i = 0; i < events.length; i++) {
          delete events[i].creator.email;
          delete events[i].creator.password;
          delete events[i].creator.lastName;

          for (let j = 0; j < events[i].replies.length; j++) {
            delete events[i].replies[j].creator.email;
            delete events[i].replies[j].creator.password;
            delete events[i].replies[j].creator.lastName;
          }
        }
        // console.log("events", events);

        res.json(events);
      })
      .catch(err => {
        console.log(err);
        res.json(err.response);
      });
  });

  //we need to have the user _id to insert into the event as well as getting the user name and user photo from the User collection
  app.post("/api/event", function(req, res) {
    console.log(req.body);
    //get latitude on longitude and store in request object
    googleMapsClient
      .geocode({ address: req.body.address })
      .asPromise()
      .then(response => {
        req.body.lat = response.json.results[0].geometry.location.lat;
        req.body.lon = response.json.results[0].geometry.location.lng;

        console.log("<------------------>");
        console.log(req.body);
        res.json(req.body);
        if (req.files != null) {
          console.log("file--------------file");

          upload(req, "img", newEvent);
        } else {
          newEvent(req);
        }
        function newEvent(req) {
          db.Event.create(req.body)
            .then(function(data) {
              data
                .populate("creator")
                .execPopulate()
                .then(populatedData => {
                  io.sockets.emit("new event", populatedData);
                  console.log("done");

                  res.end();
                })
                .catch(function(err) {
                  console.log(err);
                  res.status(500).json({ error: err });
                });
            })
            .catch(function(err) {
              console.log(err);
              res.status(500).json({ error: err });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  //make post comment
  app.post("/api/replyComment", function(req, res) {
    if (req.files != null) {
      console.log("file--------------file");
      // console.log(req.files);
      upload(req, "photos", postComment);
    } else {
      postComment(req);
    }

    function postComment(req) {
      db.Post.findOneAndUpdate(
        { _id: req.body.commentId },
        { $push: { replies: req.body } },
        { new: true }
      ).then(function(newReply) {
        io.sockets.emit("new comment", { post: newReply.replies });
        console.log("done");

        res.end();
      });
    }
  });

  //make event comment
  app.post("/api/replyEventComment", function(req, res) {
    // console.log("event req", req.body);
    if (req.files != null) {
      console.log("file--------------file");
      console.log(req.files);
      upload(req, "photos", eventComment);
    } else {
      eventComment(req);
    }

    function eventComment(req) {
      db.Event.findOneAndUpdate(
        { _id: req.body.commentId },
        { $push: { replies: req.body } }
      ).then(function(newReply) {
        io.sockets.emit("new comment", { event: newReply.replies });
        // res.json(newReply);
        res.end();
      });
    }
  });

  //get user info for profile page
  app.get("/api/userInfo", authWare, function(req, res) {
    // console.log("request", req.user._id);

    User.findById(req.user._id)
      .lean()
      .then(function(data) {
        let userData = data;
        delete userData.password;

        // console.log("userData", userData);
        res.json(userData);
      })
      .catch(function(err) {
        console.log("err", err);
      });
  });

  //post updates to user info via profile page
  app.post("/api/userInfoUpdate", authWare, function(req, res) {
    console.log("update user", req.body);
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.files != null) {
      console.log("file--------------file");
      console.log(req.files);
      upload(req, "photo", userInfoUpdating);
    } else {
      userInfoUpdating(req);
    }

    function userInfoUpdating(req) {
      User.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(function(response) {
          console.log("newResponse", response);
          res.json(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
};
