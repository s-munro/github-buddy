import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return localStorage.getItem("token") ? (
    <nav>
      <Link to="/">Home</Link>
      <Link onClick={() => localStorage.removeItem("token")} to="/login">
        Log Out
      </Link>
    </nav>
  ) : (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};
