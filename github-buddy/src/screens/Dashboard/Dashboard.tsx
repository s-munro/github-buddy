import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { getGithub } from "../../store/github/githubActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [githubUser, setGithubUser] = useState("");
  const userState = useSelector((state: RootStore) => state.github);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setGithubUser(event.target.value);

  const handleSubmit = () => dispatch(getGithub(githubUser));

  return (
    <div>
      <div>Dashboard</div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default Dashboard;
