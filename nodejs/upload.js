const path = require("path");
const cloud = require("../nodejs/cloudinaryUp");

module.exports = function(req, imgProperty, dbfunction) {
  let fileName = req.files[imgProperty].name.split(".");
  fileExtension = fileName[fileName.length - 1];
  fileName.pop()
  fileName = fileName.join(".")

  req.files[imgProperty].namelong =
    fileName + "-" +
    Date.now() + "." + fileExtension;

  req.files[imgProperty].mv(
    path.join(
      __dirname,
      "../client/public/upload",
      req.files[imgProperty].namelong
    ),
    function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("upload success");
        cloud(req.files[imgProperty].namelong)
          .then(function(imageurl) {
            console.log("create doc next");
            req.body[imgProperty] = imageurl;
            console.log(req.body);

            dbfunction(req);
          })
          .catch(function(err) {
            console.log(err.response);
          });
      }
    }
  );
  // } else {
  //   db.Event.create(req.body)
  //     .then(function(data) {
  //       data
  //         .populate("creator")
  //         .execPopulate()
  //         .then(populatedData => {
  //           io.sockets.emit("new event", populatedData);
  //           res.end();
  //         });
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // }

  // dbfunction (body) {
  //   db.Post.create(body).then(function(data) {
  //       data
  //         .populate("creator")
  //         .execPopulate()
  //         .then(populatedData => {
  //           io.sockets.emit("new post", populatedData);
  //           res.end();
  //         });
  //       // res.json(data);
  //     });
  // })
};
