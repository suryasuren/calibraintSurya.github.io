import { configureStore } from "@reduxjs/toolkit";
import persistReducers from "./reducers/index";
import persistStore from "redux-persist/es/persistStore";

const store = configureStore({
  reducer: persistReducers,
});

export const persistor = persistStore(store);
export default store;
