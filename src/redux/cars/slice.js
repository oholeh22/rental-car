import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import { fetchCars } from "./operations/fetchCars.js";

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.carList = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, totalPages, totalCars } = action.payload;
        state.loading = false;

        state.carList = [...state.carList, ...cars];
        state.totalCars = totalCars;
        state.totalPages = totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setFilters } = carSlice.actions;
export default carSlice.reducer;
