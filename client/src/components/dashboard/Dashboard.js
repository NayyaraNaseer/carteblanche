import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./navigation.css";

import InputTodo from "./todolist/InputTodo"; //for adding new doses
import ListTodos from "./todolist/ListTodos"; //for displaying existing doses

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET", //get request to view data
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const signout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token"); //deleting the token from local storage once the user signs out
      setAuth(false); //the user is no longer authenticated
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div> <br/>
      <ul class="nav">
      <li>
      <button class = "bttn" onClick= {e => signout(e)}>
      <img src = "https://lh3.googleusercontent.com/proxy/Itcera9WFhmgklo4w6QKwiornJ3YM7F69emKvbYIjx2CB8F8Q-FLUMB26CkX4touENzgCAgAWvfuJbzrsVme3zrD7-2fxTB3SNEgX5HShYg"
      width = "40" height = "40" alt = "home"/>
      </button>
      </li>
      <li>
    <button class = "bttn" onClick={e => signout(e)}>
            Signout
          </button>
      </li>
    </ul>
    <br/>
    <div class = "div">
        <div><h3><b>Hello, {name}!</b></h3>
      <h6>Welcome to your medicine dosage tracker!</h6></div>
      
      //adding the doses part
      <InputTodo setTodosChange={setTodosChange} />
      </div>
      </div>
      //displaying the doses and updating them part
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default Dashboard;