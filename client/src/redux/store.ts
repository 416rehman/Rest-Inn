import {createStore} from "redux";
import { combineReducers } from "redux"
import authReducer from "./reducers/auth.reducer";
import {metaReducer} from "./reducers/meta.reducer";

export default createStore(combineReducers({
    auth: authReducer,
    meta: metaReducer,
}));