import { combineReducers } from "@reduxjs/toolkit";
import productReducer, { productReducerVal } from "./productReducer";
import persistConfig from "../config/persistConfig";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  productData: productReducer,
  individialProduct: productReducerVal,
});

const persistReducers = persistReducer(persistConfig, rootReducer);

export default persistReducers;
