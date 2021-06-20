//the landing page of the application

import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";

const Home = () => {
  return (
    <div class = "container">
    <div class = "center">
      <form class = "form2">
      <h1>MEDICINE DOSAGE TRACKER</h1>
      <br /><br/>
      <h4>Sign in to your account or sign up if you do not have an account.</h4>
      <br/>
      <Link to="/signin">
        <button class = "btn">Sign In</button>
      </Link>
      <br/>
      <Link to="/signup">
        <button class = "btn">Sign Up</button>
      </Link>
      </form>
    
    </div>
    </div>

  );
};

export default Home;