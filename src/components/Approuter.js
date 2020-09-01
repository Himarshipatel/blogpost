import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
const Approuter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/register" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Approuter;
