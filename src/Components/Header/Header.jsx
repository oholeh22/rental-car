import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

function Header() {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <NavLink to="/" className={s.logoLink}>
          <img src="/Logo.svg" alt="Rental Car" className={s.logoImage} />
        </NavLink>
      </div>
      <nav className={s.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${s.navLink} ${s.active}` : s.navLink
          }
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
