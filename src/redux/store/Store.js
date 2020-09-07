import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Loginreducer from "../allreducers/authreducer/Loginreducer.js";
import Registerreducer from "../allreducers/authreducer/Registerreducer.js";
import Allpostreducer from "../allreducers/postreducers/Allpostreducer.js";
import Singlepostreducer from "../allreducers/postreducers/Singlepostreducer.js";
import Alltagreducer from "../allreducers/tagreducers/Alltagreducer.js";
import Createtagreducer from "../allreducers/tagreducers/Createtagreducer.js";
import Deletetagreducer from "../allreducers/tagreducers/Deletetagreducer.js";
import edittagreducer from "../allreducers/tagreducers/Edittagreducer.js";
import singletagreducer from "../allreducers/tagreducers/Singletagreducer.js";

const rootReducer = combineReducers({
  Loginreducer,
  Registerreducer,
  Allpostreducer,
  Singlepostreducer,
  Alltagreducer,
  Createtagreducer,
  Deletetagreducer,
  edittagreducer,
  singletagreducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
