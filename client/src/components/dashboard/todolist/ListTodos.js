import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import "./todos.css";

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]); //empty array

  //deleting a specific dose
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, { //by its id
        method: "DELETE", 
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.dose_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Doses per day</th>
            <th>Frequency</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {}
          {todos.length !== 0 &&
            todos[0].dose_id !== null &&
            todos.map(todo => (
              <tr key={todo.dose_id}>
                <td>{todo.medicine}</td>
                <td>{todo.dosage} {todo.units}</td>
                <td>{todo.doses}</td>
                <td>{todo.frequency} days</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    onClick={() => deleteTodo(todo.dose_id)}
                  >
                    <img src = "https://icon-library.com/images/delete-icon-transparent-background/delete-icon-transparent-background-4.jpg"
                    width = "15" height = "15" alt = "delete"/>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
