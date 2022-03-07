import {createStore} from "redux";
import authReducer from "./reducers/auth.reducer";

export default createStore(authReducer);