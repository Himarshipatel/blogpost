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
import Allcategoryreducer from "../allreducers/categoryreducers/Allcategoryreducer.js";
import Deletecategory from "../allreducers/categoryreducers/Deletecategory.js";
import editcategory from "../allreducers/categoryreducers/Editcategory.js";
import Createcategory from "../allreducers/categoryreducers/Createcategory.js";
import Singlecategory from "../allreducers/categoryreducers/Singlecategory.js";

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
  Allcategoryreducer,
  Deletecategory,
  editcategory,
  Createcategory,
  Singlecategory,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
