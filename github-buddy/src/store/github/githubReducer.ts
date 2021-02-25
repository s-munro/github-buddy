import {
  GithubDispatchTypes,
  GithubUser,
  GITHUB_SUCCESS,
  GITHUB_FAIL,
  GITHUB_LOADING,
} from "./githubActionTypes";

interface DefaultGithubState {
  loading: boolean;
  user?: GithubUser;
}

const initialState: DefaultGithubState = {
  loading: false,
};

export const githubReducer = (
  state: DefaultGithubState = initialState,
  action: GithubDispatchTypes
): DefaultGithubState => {
  switch (action.type) {
    case GITHUB_LOADING:
      return {
        loading: false,
      };
    case GITHUB_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case GITHUB_FAIL:
      return {
        loading: false,
      };
    default:
      return state;
  }
};
