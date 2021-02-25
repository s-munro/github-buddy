import axios from "axios";
import { Dispatch } from "redux";
import {
  GithubDispatchTypes,
  GITHUB_LOADING,
  GITHUB_FAIL,
  GITHUB_SUCCESS,
} from "./githubActionTypes";

export const getGithub = (githubUser: string) => async (
  dispatch: Dispatch<GithubDispatchTypes>
) => {
  try {
    dispatch({
      type: GITHUB_LOADING,
    });

    const res = await axios.get(`https://api.github.com/users/${githubUser}`);

    dispatch({
      type: GITHUB_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GITHUB_FAIL,
    });
  }
};
