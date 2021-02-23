import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

type State = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setFirstName"; payload: string }
  | { type: "setLastName"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "signupSuccess"; payload: string }
  | { type: "signupFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setFirstName":
      return {
        ...state,
        first_name: action.payload,
      };
    case "setLastName":
      return {
        ...state,
        last_name: action.payload,
      };
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "signupSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "signupFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

export const SignupForm = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (
      state.first_name.trim() &&
      state.last_name.trim() &&
      state.email.trim() &&
      state.password.trim()
    ) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.first_name, state.last_name, state.email, state.password]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    const user = {
      user_first_name: state.first_name,
      user_last_name: state.last_name,
      user_email: state.email,
      user_password: state.password,
    };

    axios
      .post(
        "https://github-buddy-backend.herokuapp.com/api/auth/register",
        user
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: "signupSuccess",
          payload: "Signup Successful",
        });
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "signupFailed",
          payload: "Email taken.",
        });
      });
  };

  const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    dispatch({
      type: "setFirstName",
      payload: event.target.value,
    });
  };
  const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    dispatch({
      type: "setLastName",
      payload: event.target.value,
    });
  };
  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    dispatch({
      type: "setEmail",
      payload: event.target.value,
    });
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <label>
        First Name
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-2"
          id="first_name"
          type="text"
          placeholder="First Name"
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last Name
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-2"
          id="last_name"
          type="text"
          placeholder="Last Name"
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-2"
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </label>
      <label>
        Password
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-2"
          id="password"
          type="password"
          onChange={handlePasswordChange}
        />
      </label>
      <button
        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        disabled={state.isButtonDisabled}
      >
        Sign Up!
      </button>
    </form>
  );
};
