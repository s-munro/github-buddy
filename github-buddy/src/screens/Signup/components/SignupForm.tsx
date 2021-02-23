import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#646464",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

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
  const classes = useStyles();
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

  const handleSignup = (): void => {
    if (state.email === "email@email.com" && state.password === "password") {
      dispatch({
        type: "signupSuccess",
        payload: "Signup Successful",
      });
      history.push("/login");
    } else {
      dispatch({
        type: "signupFailed",
        payload: "Error signing up.",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSignup();
    }
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
    <form>
      <Card>
        <CardHeader className={classes.header} title="Signup" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="first_name"
              type="text"
              label="First Name"
              placeholder="First Name"
              margin="normal"
              helperText={state.helperText}
              onChange={handleFirstNameChange}
              onKeyPress={handleKeyPress}
            />

            <TextField
              error={state.isError}
              fullWidth
              id="last_name"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              margin="normal"
              helperText={state.helperText}
              onChange={handleLastNameChange}
              onKeyPress={handleKeyPress}
            />

            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              helperText={state.helperText}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />

            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.loginBtn}
            onClick={handleSignup}
            disabled={state.isButtonDisabled}
          >
            Sign Up!
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
