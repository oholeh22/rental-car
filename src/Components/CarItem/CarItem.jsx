import React, { useState } from "react";
import s from "./CarItem.module.css";
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const formatNumber = (number) => {
    if (number == null) return "N/A";
    return new Intl.NumberFormat("en-US", { useGrouping: true })
      .format(number)
      .replace(/,/g, " ");
  };

  const getCity = (address) => {
    if (!address) return "N/A";
    const parts = address.split(",");
    return parts.length >= 2 ? parts[1].trim() : address;
  };

  const getCountry = (address) => {
    if (!address) return "N/A";
    const parts = address.split(",");
    return parts.length >= 3 ? parts[2].trim() : "N/A";
  };

  return (
    <div className={s.card}>
      <div className={s.imgCont}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model} ${car.year}`}
          className={s.photo}
        />
        <button type="button" className={s.like} onClick={toggleLike}>
  <div className={`${s.icon} ${liked ? s.liked : ""}`} />
</button>
      </div>
      <div className={s.nameNprice}>
        <p className={s.name}>
          {car.brand}&nbsp;
          <span className={s.model}>{car.model}</span>, {car.year}
        </p>
        <p className={s.price}>${car.rentalPrice}</p>
      </div>
      <div className={s.characteristics}>
        <div className={s.firstLine}>
          <div className={s.elem}>{getCity(car.address)}</div>
          <div className={s.elem}>{getCountry(car.address)}</div>
          <div className={s.elem}>{car.rentalCompany || "N/A"}</div>
        </div>
        <div className={s.secondLine}>
          <div className={s.elem}>{car.type || "N/A"}</div>
          <div className={s.elem}>
            {car.mileage ? `${formatNumber(car.mileage)} km` : "N/A"}
          </div>
        </div>
      </div>
      <Link className={s.readMore} to={`/catalog/${car.id}`}>
        Read more
      </Link>
    </div>
  );
}
