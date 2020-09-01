import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
//import Blog from "./Blog.js";
const Approuter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/register" component={Signup} />
          {/* <Route path="/" component={Blog}/> */}
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Approuter;
