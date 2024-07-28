import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./features/filterSlice";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

const reducer = combineReducers({
  filter: filterReducer,
  user: userReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer,
});
