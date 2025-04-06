import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { selectCarList, selectCurrentPage } from "../../redux/cars/selectors";
import s from "./Catalog.module.css";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);

  const page = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  return (
    <div>
      <ul className={s.list}>
        {cars.map((car) => (
          <li key={car.id}></li>
        ))}
      </ul>
    </div>
  );
}
