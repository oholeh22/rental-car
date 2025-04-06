import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (carsState) => carsState.carList
);

export const selectFilters = createSelector(
  selectCars,
  (carsState) => carsState.filters
);

export const selectCurrentPage = createSelector(
  selectCars,
  (carsState) => carsState.page
);

export const selectTotalPages = createSelector(
  selectCars,
  (carsState) => carsState.totalPages
);

export const selectLoading = createSelector(
  selectCars,
  (carsState) => carsState.loading
);

export const selectError = createSelector(
  selectCars,
  (carsState) => carsState.error
);

export const selectHasMore = createSelector(
    selectCurrentPage,
    selectTotalPages,
    (currentPage, totalPages) => currentPage < totalPages
  );