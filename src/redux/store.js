import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducers from "./reducers/AuthReducers";
import CategoriesReducers from "./reducers/CategoriesReducers";
import PostsReducers from "./reducers/PostsReducers";
import TagsReducers from "./reducers/TagsReducers";

const rootReducer = combineReducers({
  AuthReducers,
  CategoriesReducers,
  PostsReducers,
  TagsReducers,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
