const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//at the registeration part
router.post("/signup", validInfo, async (req, res) => {
  const { name, email, password, password2 } = req.body;

  //checking if the provided username already exists
  try {
    const nameCheck = await pool.query("SELECT * FROM users WHERE user_name = $1", [name]);
    //error shown since no two users can have the same username
    if (nameCheck.rows.length > 0) {
      return res.status(401).json("This user already exists!");
    }

    //checking if the provided email already exists
    const emailCheck = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    //error shown since no two emails can be the same
    if (emailCheck.rows.length > 0) {
      return res.status(401).json("This email is already registered!");
    }

    //salting the password makes its hash even harder to crack
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword] //note that the encrypted password is being stored in the database for additional security
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

//at the logging in part
router.post("/signin", validInfo, async (req, res) => {
  const { name, password } = req.body;

  //checking if the user is registered
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [name]);
    //error shown if the user is not registered
    if (user.rows.length === 0) {
      return res.status(401).json("This user does not exist!");
    }
    //confirming user's provided password and the stored password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Incorrect password!");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true); //user has been verified
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;