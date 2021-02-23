import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
interface Token {
  token: string;
}

type State = {
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  email: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
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

export const LoginForm = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
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
  }, [state.email, state.password]);

  const handleSubmit = (): void => {
    const user = {
      user_email: state.email,
      user_password: state.password,
    };
    axios
      .post<Token>(
        "https://github-buddy-backend.herokuapp.com/api/auth/login",
        user
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: "loginSuccess",
          payload: "Login Successful.",
        });
        history.push("/");
      })
      .catch((err) => {
        dispatch({
          type: "loginFailed",
          payload: "Login Failed.",
        });
        console.log(err);
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
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </label>
      <button
        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        disabled={state.isButtonDisabled}
      >
        Login
      </button>
    </form>
  );
};
