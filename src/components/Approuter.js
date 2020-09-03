import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import Post from "./Singlepost.js";
const Approuter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/post/:id" component={Post} />

          <Route path="/register" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Approuter;
