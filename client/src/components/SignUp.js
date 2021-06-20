import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./pages.css";

const SignUp = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  }); //the 4 fiels required at sign up

  const { name, email, password, password2 } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    //the data submitted to the sign up form is posted to the database
    e.preventDefault();
    try {
      const body = { name, email, password, password2 };
      const response = await fetch( //await is repeatedly being used since such calls take time
        "http://localhost:5000/authentication/signup",
        {
          method: "POST", //since data needs to be added to the database, POST method is specified
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        //once token is found, it is stored in the local storage
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true); //and the user is authenticated
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
      //form containing the input fields for registeration
      <label> <b>Username</b> </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <label> <b>Email</b> </label>
        <input
          type="text"
          name="email"
          value={email}
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
        <label> <b>Confirm Password</b> </label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button class = "btn">Sign Up</button>
  
      <br/>
      //in case the user needs to sign in instead of sign up
      <Link to="/signin"><button class = "btn">Already have an account? Sign in, instead.</button></Link>
          </form>
          </div></div>
    </Fragment>
  );
};

export default SignUp;