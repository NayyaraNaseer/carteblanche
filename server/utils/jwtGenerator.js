  
const jwt = require("jsonwebtoken"); //to work with JWT
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = { //the actually data the token carries
    user: {
      id: user_id
    }
  };
  //user will be logged out of the system after an hour if he/she doesn't manually log out
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;