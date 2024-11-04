import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import { cartReducer } from "./cartReducer";


const allReducers = combineReducers({
      loginReducer,
      cartReducer
})

export default allReducers;