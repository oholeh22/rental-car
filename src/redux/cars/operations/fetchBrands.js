import axios from "axios";

export const fetchBrands = async () => {
  try {
    const response = await axios.get("/brands");

    return response.data;
  } catch (error) {
    throw new Error("Error fetching brands", error);
  }
};