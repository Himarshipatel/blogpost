import React from "react";
import { Route, Redirect } from "react-router-dom";

const Privaterouter = ({ component: Component, path }) => {
  const tokenn = localStorage.getItem("token");
  return (
    <Route
      path={path}
      render={(props) =>
        tokenn ? <Component {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default Privaterouter;
