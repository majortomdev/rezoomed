import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <NavLink to="/urls" activeClassName="active" className="nav-link">
        myURLs
      </NavLink>
      <NavLink to="/datatags" activeClassName="active" className="nav-link">
        myData
      </NavLink> */}

      <NavLink to="/urls" className="nav-link">
        myURLs
      </NavLink>
      <NavLink to="/datatags" className="nav-link">
        myData
      </NavLink>

      {/* <NavLink
        to="/urls"
        className={(navData) => (navData.isActive ? "active" : "nav-link")}
      >
        myURLs
      </NavLink>
      <NavLink
        to="/datatags"
        className={(navData) => (navData.isActive ? "active" : "nav-link")}
      >
        myData
      </NavLink> */}
    </nav>
  );
};

export default Navbar;
