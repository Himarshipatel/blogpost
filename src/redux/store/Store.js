import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Loginreducer from "../allreducers/authreducer/Loginreducer.js";
import Registerreducer from "../allreducers/authreducer/Registerreducer.js";
import Allpostreducer from "../allreducers/postreducers/Allpostreducer.js";
import Singlepostreducer from "../allreducers/postreducers/Singlepostreducer.js";

const rootReducer = combineReducers({
  Loginreducer,
  Registerreducer,
  Allpostreducer,
  Singlepostreducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
