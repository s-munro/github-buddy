import React from "react";

export const SignupForm = () => {
  return (
    <form>
      <label>
        First Name
        <input />
      </label>

      <label>
        Last Name
        <input />
      </label>

      <label>
        Email
        <input />
      </label>

      <label>
        Password
        <input />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};
