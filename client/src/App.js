import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify"; //toastify is used for interactive notifications
import "react-toastify/dist/ReactToastify.css"; 
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";


//the main components
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

toast.configure();

//function verifies whether the user is authenticated
function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
    //setting the routes for the applications
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Home {...props} /> 
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            //if at sign in, the user gets authenticated, redirect to the dashboard
            <Route
              exact
              path="/signin"
              render={props =>
                !isAuthenticated ? (
                  <SignIn {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            //if at sign up, the user gets authenticared, redirect to the dashboard
            <Route
              exact
              path="/signup"
              render={props =>
                !isAuthenticated ? (
                  <SignUp {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            //at dashboard, if the user gets unauthenticated (e.g., signs out), redirect to sign in
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/signin" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;