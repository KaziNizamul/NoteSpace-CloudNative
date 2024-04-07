import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUserLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navbarItems = [
    { path: "/notes", name: "Notes", visible: location.pathname !== "/notes" },
    {
      path: "/new-note",
      name: "New Note",
      visible: location.pathname !== "/new-note",
    },
    { path: "/login", name: "Login", visible: !isUserLoggedIn },
    { path: "/register", name: "Register", visible: !isUserLoggedIn },
    {
      path: "/logout",
      name: "Logout",
      onClick: handleLogout,
      visible: isUserLoggedIn,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <Link className={styles["navbar-brand"]}>Notes App</Link>
      <ul className={styles["navbar-nav"]}>
        {navbarItems.map(
          (item, index) =>
            item.visible && (
              <li
                key={index}
                className={`${styles["nav-item"]} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                {item.onClick ? (
                  <a href="#" onClick={item.onClick}>
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.path}>{item.name}</Link>
                )}
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
