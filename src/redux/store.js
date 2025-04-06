import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./cars/slice";

const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});

export default store;
