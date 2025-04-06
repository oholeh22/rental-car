import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./CarDetails.module.css";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://car-rental-api.goit.global/cars/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch car data");
        }
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className={s.loading}>Loading...</p>;
  if (error) return <p className={s.error}>Error: {error}</p>;
  if (!car) return <p className={s.error}>No car data</p>;

  const formatNumber = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat("en-US", { useGrouping: true })
      .format(number)
      .replace(/,/g, " ");
  };

  const location = car.address
    ? car.address.replace("Kiev", "Kyiv")
    : "Kyiv, Ukraine";

  return (
    <div className={s.detailsContainer}>
      <div className={s.leftColumn}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}, ${car.year}`}
          className={s.carImage}
        />
        <div className={s.bookingForm}>
          <h3>Book your car now</h3>
          <p className={s.bookingFormPar}>
            Stay connected! We are always ready to help you.
          </p>
          <form>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="date" name="bookingDate" placeholder="Booking Date" />
            <input type="tel" name="phone" placeholder="Phone number" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className={s.rightColumn}>
        <div className={s.titleRow}>
          <h2 className={s.carTitle}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <span className={s.carId}>Id: {car.id}</span>
        </div>

        <div className={s.metaRow}>
          <div className={s.locationContainer}>
            <img
              src="/assets/Location.svg"
              alt="Location"
              className={s.locationIcon}
              width="16"
              height="16"
            />
            <span className={s.locationText}>
              {car.address || "Kyiv, Ukraine"}
            </span>
          </div>
          <span className={s.mileage}>
            Mileage: {car.mileage ? `${formatNumber(car.mileage)} km` : "N/A"}
          </span>
        </div>

        <p className={s.price}>${car.rentalPrice}</p>

        <p className={s.description}>{car.description}</p>

        <div className={s.rentalConditions}>
          <h3>Rental Conditions:</h3>
          <ul className={s.listWithIcons}>
            {car.rentalConditions?.map((cond, index) => (
              <li key={index}>{cond}</li>
            ))}
          </ul>
        </div>

        <div className={s.specifications}>
          <h3>Car Specifications:</h3>
          <ul className={s.specList}>
            <li>Year: {car.year || "N/A"}</li>
            <li>Type: {car.type || "N/A"}</li>
            <li>Fuel Consumption: {car.fuelConsumption || "N/A"}</li>
            <li>Engine Size: {car.engineSize || "N/A"}</li>
          </ul>
        </div>

        <div className={s.accessories}>
          <h3>Accessories & Functionalities:</h3>
          <ul className={s.listWithIcons}>
            {car.accessories?.map((item, index) => (
              <li key={`acc-${index}`}>{item}</li>
            ))}
            {car.functionalities?.map((func, index) => (
              <li key={`func-${index}`}>{func}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
