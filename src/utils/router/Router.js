import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute.js";
import {
  Login,
  Register,
  SinglePost,
  Posts,
  AllPosts,
  Tags,
  Categories,
  AllCategories,
  AllTags,
} from "../../containers";
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tag_tags" component={AllTags} />
        <Route path="/categories_tags" component={AllCategories} />

        <Route path="/register" component={Register} />

        <Route path="/login" component={Login} />

        <PrivateRoute path="/category" component={Categories} exact={true} />
        <PrivateRoute path="/tag" component={Tags} exact={true} />
        <PrivateRoute path="/posts" component={Posts} exact={true} />

        <Route path="/:slug/:id" component={SinglePost} />

        <Route path="/" component={AllPosts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
