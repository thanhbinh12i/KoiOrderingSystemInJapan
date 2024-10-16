import {combineReducers} from "redux";
import loginReducer from "./login";
import { cartReducer } from "./cartReducer";


const allReducers = combineReducers({
      loginReducer,
      cartReducer
})

export default allReducers;