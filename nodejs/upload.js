module.exports = function(files,body,dbfunction) {
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


      dbfunction (body) {
        db.Post.create(body).then(function(data) {
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
      }