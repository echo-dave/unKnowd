// const db = require("../models");
const path = require("path");
const User = require("../models/User");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");
const authWare = require("../middleware/authware");
// const socketIOClient = require("socket.io-client");
// const socket = socketIOClient("http://127.0.0.1:3001");
const cloud = require("../nodejs/cloudinaryUp");

module.exports = function(app, io) {
  app.post("/api/signup", function(req, res) {
    console.log(req.body, req.files);

    if (req.files != null) {
      console.log("file--------------file");
      console.log(req.files);

      req.files.photo.namelong =
        req.files.photo.name.slice(0, -4) +
        "-" +
        Date.now() +
        req.files.photo.name.slice(-4);

      req.files.photo.mv(
        path.join(
          __dirname,
          "../client/public/upload",
          req.files.photo.namelong
        ),
        function(err) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log("upload success");
            cloud(req.files.photo.namelong)
              .then(function(imageurl) {
                console.log("create doc next");
                req.body.photo = imageurl;
                console.log(req.body);

                User.create(req.body)
                  .then(function(result) {
                    res.json({ message: "user created", user: result._id });
                  })
                  .catch(function(err) {
                    res.status(500).json({ error: err.message });
                  });
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        }
      );
    } else {
      User.create(req.body)
        .then(function(result) {
          res.json({ message: "user created", user: result._id });
        })
        .catch(function(err) {
          res.status(500).json({ error: err.message });
        });
    }
  });

  app.post("/api/eventForm", function(req, res) {
    Event.create(req.body)
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
          process.env.SECRET
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

  app.get("/api/all", function(req, res) {
    Event.find({})
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.status(500).json({ error: err.message });
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
    console.log(req.body);
    console.log(req.files);

    if (req.files != null) {
      console.log("file--------------file");
      console.log(req.files);

      req.files.photos.namelong =
        req.files.photos.name.slice(0, -4) +
        "-" +
        Date.now() +
        req.files.photos.name.slice(-4);

      req.files.photos.mv(
        path.join(
          __dirname,
          "../client/public/upload",
          req.files.photos.namelong
        ),
        function(err) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log("upload success");
            cloud(req.files.photos.namelong)
              .then(function(imageurl) {
                console.log("create doc next");
                req.body.photos = [imageurl];

                db.Post.create(req.body).then(function(data) {
                  data
                    .populate("creator")
                    .execPopulate()
                    .then(populatedData => {
                      io.sockets.emit("new post", populatedData);
                      res.end();
                    });
                  // res.json(data);
                });
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        }
      );
    } else {
      db.Post.create(req.body).then(function(data) {
        data
          .populate("creator")
          .execPopulate()
          .then(populatedData => {
            io.sockets.emit("new post", populatedData);
            res.end();
          });
        // res.json(data);
      });
    }
  });

  app.get("/api/events", function(req, res) {
    let currentDate = new Date();
    console.log(currentDate);
    db.Event.find({
      "date.start": { $gte: new Date(currentDate) }
    })
      .populate("creator")
      .then(events => {
        res.json(events);
      });
  });

  //we need to have the user _id to insert into the event as well as getting the user name and user photo from the User collection
  app.post("/api/event", function(req, res) {
    console.log(req.body);

    if (req.files != null) {
      console.log("file--------------file");
      console.log(req.files);

      req.files.img.namelong =
        req.files.img.name.slice(0, -4) +
        "-" +
        Date.now() +
        req.files.img.name.slice(-4);

      req.files.img.mv(
        path.join(__dirname, "../client/public/upload", req.files.img.namelong),
        function(err) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log("upload success");
            cloud(req.files.img.namelong)
              .then(function(imageurl) {
                console.log("create doc next");
                req.body.img = imageurl;
                console.log(req.body);

                db.Event.create(req.body).then(function(data) {
                  data
                    .populate("creator")
                    .execPopulate()
                    .then(populatedData => {
                      io.sockets.emit("new event", populatedData);
                      res.end();
                    });
                  // res.json(data);
                });
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        }
      );
    } else {
      db.Event.create(req.body)
        .then(function(data) {
          data
            .populate("creator")
            .execPopulate()
            .then(populatedData => {
              io.sockets.emit("new event", populatedData);
              res.end();
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });

  app.get("/api/getComments", function(req, res) {
    console.log("query", req.query);
    db.Post.find({ _id: req.query._id }).then(function(comments) {
      console.log(comments);
      // console.log("arrayReplies", comments[0].replies);

      res.json(comments[0].replies);
    });
  });

  app.post("/api/replyComment", function(req, res) {
    console.log(req.body);
    db.Post.findOneAndUpdate(
      { _id: req.body.commentId },
      { $push: { replies: req.body } }
    ).then(function(newReply) {
      console.log("newReply", newReply);

      // io.sockets.emit("new post reply", newReply);
      res.json(newReply);
    });
  });
};
