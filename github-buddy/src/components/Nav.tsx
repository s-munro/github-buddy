import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Nav = () => {
  return localStorage.getItem("token") ? (
    <nav>
      <Link to="/">
        <img src={logo} alt="clickable logo" />
      </Link>
      <Link onClick={() => localStorage.removeItem("token")} to="/login">
        Log Out
      </Link>
    </nav>
  ) : (
    <nav className="grid grid-cols-12 pb-2">
      <Link className="col-span-8" to="/">
        <img src={logo} alt="clickable logo" width="25px" />
      </Link>
      <div className="col-span-2 flex justify-end items-center">
        <Link to="/signup">Signup</Link>
      </div>
      <div className="col-span-2 flex justify-end items-center">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
