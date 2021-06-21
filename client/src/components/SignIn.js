import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./pages.css";

const SignIn = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    password: ""
  }); //sign in only requires the name and the password

  const { name, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, password };
      const response = await fetch(
        "http://localhost:5000/authentication/signin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken); //the token has been stored in local storage
        setAuth(true); //user authenticated
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
    <div class = "container">
    <div class = "center">
    
      <form class = "form" onSubmit={onSubmitForm}>
        <label> <b>Username</b> </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <label> <b>Password</b> </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <br />
        <button class = "btn">Sign In</button>

      <br />
      <Link to="/signup"><button class = "btn">New here? Sign up for an account.</button></Link> 
        </form>
      </div>  
      </div>
       </Fragment>
  );
};

export default SignIn;
