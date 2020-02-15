const path = require("path");
const cloud = require("../nodejs/cloudinaryUp");

module.exports = function(req, imgProperty, dbfunction) {
  let fileName = req.files[imgProperty].name.split(".");
  let fileExtension = fileName[fileName.length - 1];
  fileName.pop();
  fileName = fileName.join(".");

  req.files[imgProperty].namelong =
    fileName + "-" + Date.now() + "." + fileExtension;

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
};
