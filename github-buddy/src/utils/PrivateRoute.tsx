import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  path: RouteProps["path"];
  component: React.ElementType;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  return (
    <Route
      render={() =>
        localStorage.getItem("token") ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};
