import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../../containers/auth/Login.js";
import Register from "../../containers/auth/Register.js";

import SinglePost from "../../containers/posts/SinglePost.js";
import Posts from "../../containers/posts/Posts.js";
import AllPosts from "../../containers/posts/AllPosts.js";
import Tags from "../../containers/tags/Tags.js";
import Categories from "../../containers/categories/Categories.js";
import PrivateRoute from "../../components/PrivateRoute.js";
import AllCategories from "../../containers/categories/AllCategories.js";
import AllTags from "../../containers/tags/AllTags.js";
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
