import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

const reducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer,
});
