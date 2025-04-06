import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page, filters }, thunkAPI) => {
    try {
      const response = await axios.get(`/cars`, {
        params: {
            page,
            maxRentalPrice: filters.price,
            brand: filters.brand,
            minMileage: filters.minMileage,
            maxMileage: filters.maxMileage,
          },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);