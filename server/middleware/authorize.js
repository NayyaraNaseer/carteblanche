const jwt = require("jsonwebtoken");
require("dotenv").config();

//middleware continues if the token is in local storage
module.exports = function(req, res, next) {
  //getting the token from the header
  const token = req.header("jwt_token");

  //if there is no token, user cannot be authorized
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  try {
    //verifying the token with the secret key originally saved
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next(); //middleware continues
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid!" });
  }
};