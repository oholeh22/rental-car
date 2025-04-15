import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CarCard from "../CarItem/CarItem";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { setPage } from "../../redux/cars/slice"; 
import {
  selectCarList,
  selectCurrentPage,
  selectHasMore,
  selectFilters,
  selectLoading,
} from "../../redux/cars/selectors";
import s from "./CarList.module.css";
import Loader from "../Loader/Loader";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchCars({ page: 1, filters }));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchCars({ page: nextPage, filters }));
  };

  const filteredCars = filters.price
    ? cars.filter((car) => Number(car.rentalPrice) <= Number(filters.price))
    : cars;

  return (
    <div className={s.carListContainer}>
      {filteredCars.length === 0 && !loading ? (
        <p>No available cars</p>
      ) : (
        <div className={s.carGrid}>
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {loading && <Loader />}

      {hasMore && !loading && (
        <button type="button" className={s.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CarList;
