const db = require("../models");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authWare = require("../middleware/authware");
// const socketIOClient = require("socket.io-client");
// const socket = socketIOClient("http://127.0.0.1:3001");
const upload = require("../nodejs/upload");
const bcrypt = require("bcryptjs");
const nodemail = require("../nodejs/nodemail");
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_GEOCODE,
  Promise: Promise
});

module.exports = function(app, io) {
  app.post("/api/signup", function(req, res) {
    // console.log("signup body", req.body, req.files);

    if (req.files != null) {
      // console.log(req.files);

      upload(req, "photo", signup);
    } else {
      signup(req);
    }

    function signup(req) {
      User.create(req.body)
        .then(function(result) {
          if (result._id) {
            // console.log(result);

            res.json({ message: "user created", user: result._id });
          }
        })
        .catch(function(err) {
          if (err.code === 11000){
            res.status(500).json({ error: "email in use" });
          }
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

  app.get("/api/posts/:page", authWare, function(req, res) {
    
    db.Post.find()
      .sort({ lastEdit: -1, dateCreated: -1})
      .limit(20)
      .skip(Math.max(parseInt(req.params.page)-1,0)*20)
      .populate({path: "creator", select: "-email -password -lastName"})
      .populate({path: "replies.creator", select: "-email -password -lastName"})
      .then(posts => {
        db.Post.countDocuments().then(postsCount => res.json({posts:posts,count:postsCount}));
        

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  app.post("/api/post", authWare, function(req, res) {
    req.body.lastEdit = req.body.dateCreated
    if (req.files != null) {

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

  app.put("/api/post/update", authWare, function(req,res){
    let postId = req.body.postId;
    delete req.body.postId;

    if (req.files != null) {
      // console.log("file--------------file");
      // console.log(req.files);
      upload(req, "photos", updatePost);
    } else updatePost(req);

    function updatePost (req) {
      db.Post.findOneAndUpdate({_id: postId},{$set: req.body},{new: true})
        .populate({path:"creator",select: "-email -password -lastName"})
        .populate({path:"replies.creator", select: "-email -password -lastName"})
        .then(updatePopulated => {
          io.sockets.emit("new post", {updatePost: updatePopulated});
          res.end();
        }).catch(function(err) {
          console.log(err);
          res.status(500).json({error: err.message});
        });
    }
 });

  app.get("/api/events", function(req, res) {
    let currentDate = new Date();
    let yesterday = currentDate.setDate(currentDate.getDate() - 1);

    db.Event.find({
      "date.start": { $gte: new Date(yesterday) }
    })
      .sort({ "date.start": 1 })
      .populate({path: "creator", select: "-email -password -lastName"})
      .populate({path: "replies.creator", select: "-email -password -lastName"})
      .then(events => {        
        res.json(events);
      })
      .catch(err => {
        console.log(err);
        res.json(err.response);
      });
  });

  //we need to have the user _id to insert into the event as well as getting the user name and user photo from the User collection
  app.post("/api/event", authWare, function(req, res) {
    console.log(req.body);
    //get latitude on longitude and store in request object
    googleMapsClient
      .geocode({ address: req.body.address })
      .asPromise()
      .then(response => {
        req.body.lat = response.json.results[0].geometry.location.lat;
        req.body.lon = response.json.results[0].geometry.location.lng;

        // res.json(req.body);
        if (req.files != null) {

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
        res.status(500).json({err: err})
      });
  });

  app.put("/api/event/update", authWare, function(req,res){
   let eventId = req.body.eventId;
   delete req.body.eventId; 

   if (req.files != null) {
    upload(req, "img", updateEvent);
   } else {
    updateEvent(req)
   }
   function updateEvent(req) {
    db.Event.findOneAndUpdate({_id: eventId},{$set:req.body},{new: true})
    .populate({path:"creator", select: "-email -password -lastName"})
    .populate({path:"replies.creator", select: "-email -password -lastName"})
    .then(eventUpdate => {
      io.sockets.emit("new event", {updateEvent: eventUpdate});
      res.end();
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({error: err});
    });
   }

  })

  //make post comment
  app.post("/api/replyComment", authWare, function(req, res) {
    if (req.files != null) {
      // console.log("file--------------file");
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

        res.end();
      });
    }
  });

  //make event comment
  app.post("/api/replyEventComment", authWare, function(req, res) {
    // console.log("event req", req.body);
    if (req.files != null) {
      // console.log("file--------------file");
      // console.log(req.files);
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
      // console.log("file--------------file");
      console.log(req.files);
      upload(req, "photo", userInfoUpdating);
    } else {
      userInfoUpdating(req);
    }

    function userInfoUpdating(req) {
      User.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(function(response) {
          // console.log("newResponse", response);
          res.json(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });

  app.get("/api/mapsecretkeys", function(req, res) {
    res.json({ mapKey: process.env.MAPJS });
  });

  //static map markers from database
  app.get("/api/markers",function(req,res){
    db.Marker.find().then((markers) => res.json(markers))
    .catch(err => {
      console.log(err);
      res.json({error:err});
    })
  });

  //pssword resets
  app.post("/api/user/reset",function(req,res){
  

    db.User.find({email:req.body.email, resetToken:req.body.token}).then(response => {
      console.log(response);
      if (response.length === 1) {
        let uId = response[0]._id;
        console.log("uid ", uId);
        
      req.body.password = bcrypt.hashSync(req.body.password, 10);
        db.User.findByIdAndUpdate(uId, {password: req.body.password},{new: true}).then(status => {
          console.log(status);
          res.json({message:"Password Updated"});
          db.User.findByIdAndUpdate(uId, {$unset: {resetToken: 1}},{new: true}).then(user => {
            console.log("deleted token ", user);            
          })
        })
      }
    }).catch(err => {
      console.log(err);
      res.json({message:err})      
    })
  })


//get password reset token
  app.get("/api/user/requestreset",function(req,res){

    
    db.User.find({email:req.query.email}).select("email").then(response =>  {
      // console.log("response",response);
      
      if (response.length !== 1) {
        res.json({error:"no user"});
      } else {
        db.User.findByIdAndUpdate(response[0]._id, {resetToken: makeToken()},{new: true,select: "resetToken email firstName"}).then(updatedUser => {
          // console.log("token user",updatedUser);

          res.json({message:"Check your email for token"})
          // res.json([updatedUser,{token:updatedUser.resetToken}]);
          //build message
          msgTo = updatedUser.email
          resetURL = 'http://unknowd.herokuapp.com/user/reset/'
          textMsg = `Hi ${updatedUser.firstName}, sorry you lost your password! Here's a token to go get a new one: ${updatedUser.resetToken} 
          ${resetURL+updatedUser.resetToken}`
          htmlMsg = `<p> Hi ${updatedUser.firstName}, 
          <br />Sorry you lost your password!</p>
          <p>Here's a token to go get a new one:</p>
          <p>${updatedUser.resetToken}</p> 
          <p><a href="${resetURL+updatedUser.resetToken}/${updatedUser.email}">${resetURL+updatedUser.resetToken}/${updatedUser.email}</a></p>`
          msgSubject = "unKnowd Password Reset"

          nodemail(msgTo,textMsg,htmlMsg,msgSubject);
        })
      };
      }).catch(err => console.log(err)
      );

      makeToken = () => {
        let randToken
        rand = () => {
          let cTime = new Date();
          cTime= Date.parse(cTime)
          randToken = Math.random()*cTime
        randToken = randToken.toString(36).substr(2)
        }
        rand()
        token = randToken
        rand()
        token += randToken
        return token
      }
  })
};

