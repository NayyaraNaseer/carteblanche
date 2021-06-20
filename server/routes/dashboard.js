//PostgreSQL queries for interacting with the database

const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//display all the doses for a particular user
router.get("/", authorize, async (req, res) => {
  try {

    const user = await pool.query(
      //using left join to fetch each user's name and medicinal data
      "SELECT u.user_name, t.dose_id, t.medicine, t.dosage, t.units, t.doses, t.frequency FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//add a new dose
router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { medicine, dosage, units, doses, frequency } = req.body;
    const newDose = await pool.query(
      "INSERT INTO todos (user_id, medicine, dosage, units, doses, frequency) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.user.id, medicine, dosage, units, doses, frequency]
    );

    res.json(newDose.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//edit an existing dose
router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { medicine, dosage, units, doses, frequency } = req.body;
    const editDose = await pool.query(
      //setting all the columns to the updated values
      "UPDATE todos SET medicine = $1, dosage = $2, units = $3, doses = $4, frequency = $5 WHERE dose_id = $6 AND user_id = $7",
      [medicine, dosage, units, doses, frequency, id, req.user.id]
    );

    if (editDose.rows.length === 0) {
      return res.json("This dose is not yours.");
    }

    res.json("Dose updated.");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a dose
router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; //only the unique dose_id is required from the todos table to delete a record
    const deleteDose = await pool.query(
      "DELETE FROM todos WHERE dose_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteDose.rows.length === 0) {
      return res.json("This dose is not yours.");
    }

    res.json("Dose deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;