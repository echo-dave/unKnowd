const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const pubKey = fs.readFileSync('.pubkey',{encoding: 'utf8'},(err,data) => err ? console.log(err) : data)

module.exports = function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();
    const token = authorization.replace("Bearer ", "");
    //note the type should be ES256K which is not yet supported properly so we have to allow invalid tyeps for now
    const decoded = jwt.verify(token, pubKey, {allowInvalidAsymmetricKeyTypes: true});

    User.findOne({ _id: decoded.data }).then(function(dbUser) {
      req.user = dbUser;
      next();
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
