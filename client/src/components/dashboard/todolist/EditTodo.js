import React, { Fragment, useState } from "react";
import "./todos.css";

const EditTodo = ({ todo, setTodosChange }) => {

  const editText = async id => {
    try {
      const body = { medicine, dosage, units, doses, frequency };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "PUT", //PUT request for updating
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setTodosChange(true);

    } catch (err) {
      console.error(err.message);
    }
  };

  //functions to set the updated values of all variables
  const [medicine, setMedicine] = useState(todo.medicine);
  const [dosage, setDosage] = useState(todo.dosage);
  const [units, setUnits] = useState(todo.units);
  const [doses, setDoses] = useState(todo.doses);
  const [frequency, setFrequency] = useState(todo.frequency);

  return (
    <Fragment>
      <button
        data-toggle="modal"
        data-target={`#id${todo.dose_id}`}
      >
        <img src = "https://www.pngkey.com/png/full/364-3641423_edit-document-button-comments-document-icon.png" 
        width = "15" height = "15" alt = "edit"/>
      </button>
      {/* id = "id21"*/}
      <div
        className="modal"
        id={`id${todo.dose_id}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">EDIT A MEDICINE</h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">

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
              <select name="units" value = {units} 
              onChange={e => setUnits(e.target.value)} className="form-control">
                <option value = "tablet(s)"> tablet(s) </option>
                <option value = "spoon(s)"> spoon(s) </option>
                <option value = "drop(s)"> drop(s) </option>
              </select>

              <label><b>Doses per day</b></label>
              <select name="doses" value = {doses} 
              onChange={e => setDoses(e.target.value)} className="form-control">
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
              </select>

              <label><b>Frequency</b></label>
              <select name="frequency" value = {frequency} 
              onChange={e => setFrequency(e.target.value)} className="form-control">
                <option value = "3">3 days</option>
                <option value = "5">5 days</option>
                <option value = "7">7 days</option>
                <option value = "14">14 days</option>
                <option value = "21">21 days</option>
              </select>

            </div>

            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                onClick={() => editText(todo.dose_id)}
              >
                EDIT MEDICINE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;