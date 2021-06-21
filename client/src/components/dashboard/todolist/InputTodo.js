import React, { Fragment, useState } from "react";
import "./todos.css";

const InputTodo = ({ setTodosChange }) => {
  //setting the values for all the variables
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [units, setUnits] = useState("");
  const [doses, setDoses] = useState("");
  const [frequency, setFrequency] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { medicine, dosage, units, doses, frequency };
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        //adding to the database
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setMedicine("");
      setDosage("");
      setUnits("");
      setDoses("");
      setFrequency("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>

<button type="button" data-toggle="modal" data-target="#myModal" class = "bttn2">ADD A DOSE</button>

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">ADD A MEDICINE</h4>
      </div>
      <div class="modal-body">
        

      <form onSubmit={onSubmitForm}>
        <label><b>Medicine Name</b></label>
        <input
          type="text"
          className="form-control"
          value={medicine}
          onChange={e => setMedicine(e.target.value)}
        />

        <label><b>Dosage</b></label>
        <input
          type="text"
          className="form-control"
          value={dosage}
          onChange={e => setDosage(e.target.value)}
        />

        <label><b>Dosage Unit(s)</b></label>
        <select name="units" onChange={e => setUnits(e.target.value)} required
        className="form-control">
          <option value = "tablet(s)"> tablet(s) </option>
          <option value = "spoon(s)"> spoon(s) </option>
          <option value = "drop(s)"> drop(s) </option>
        </select>

        <label><b>Doses per day</b></label>
        <select name="doses" onChange={e => setDoses(e.target.value)} required
        className="form-control">
          <option value = "1">1</option>
          <option value = "2">2</option>
          <option value = "3">3</option>
          <option value = "4">4</option>
          <option value = "5">5</option>
        </select>

        <label><b>Frequency</b></label>
        <select name="frequency" onChange={e => setFrequency(e.target.value)} required
        className="form-control">
          <option value = "3">3 days</option>
          <option value = "5">5 days</option>
          <option value = "7">7 days</option>
          <option value = "14">14 days</option>
          <option value = "21">21 days</option>
        </select>
        <br/>
        <button class = "bttn">ADD MEDICINE</button>

      </form>

      </div>
    </div>

  </div>
</div>

    </Fragment>
  );
};

export default InputTodo;
