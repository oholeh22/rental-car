import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={s.hero}>
      <div className={s.overlay}>
        <h1 className={s.title}>Find your perfect rental car</h1>
        <p className={s.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <NavLink to="/catalog" className={s.button}>
          View Catalog
        </NavLink>
      </div>
    </section>
  );
};

export default Hero;
