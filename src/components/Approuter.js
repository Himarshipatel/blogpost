import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import Post from "./Singlepost.js";
import Posts from "./Post.js";
import Tags from "./Tags.js";
import Category from "./Category.js";
import Categoriestag from "./Categoriestag.js";
import Tagtags from "./Tagtags.js";
import PrivateRoute from "./PrivateRoute.js";
const Approuter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/tag_tags" component={Tagtags} />
          <Route path="/categories_tags" component={Categoriestag} />

          <Route path="/register" component={Signup} />

          <Route path="/login" component={Login} />

          <PrivateRoute path="/category" component={Category} exact={true} />
          <PrivateRoute path="/tag" component={Tags} exact={true} />
          <PrivateRoute path="/posts" component={Posts} exact={true} />

          <Route path="/:slug/:id" component={Post} />

          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Approuter;
