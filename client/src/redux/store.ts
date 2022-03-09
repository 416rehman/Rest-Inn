import {createStore} from "redux";
import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import {metaReducer} from "./reducers/meta.reducer";

export default createStore(combineReducers({
    auth: authReducer,
    meta: metaReducer,
}));