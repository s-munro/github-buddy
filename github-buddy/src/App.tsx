import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Nav } from "./components/Nav";
import Signup from "./screens/Signup/Signup";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";

import { PrivateRoute } from "./utils/PrivateRoute";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
