const filters = {
    brand: "",
    price: "",
    mileage: {
      minMileage: "",
      maxMileage: "",
    },
  };
  
  export const initialState = {
    carList: [],
    filters,
    page: 1,
    totalPages: 1,
    totalCars: 0,
    loading: false,
    error: null,
  };