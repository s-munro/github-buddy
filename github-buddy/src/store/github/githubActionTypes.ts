export const GITHUB_LOADING = "GITHUB_LOADING";
export const GITHUB_FAIL = "GITHUB_FAIL";
export const GITHUB_SUCCESS = "GITHUB_SUCCESS";

export interface GithubUser {
  login: string;
  avatar_url: string;
  url: string;
  name: string;
  public_repos: number;
  repos_url: string;
  followers: number;
  following: number;
}

export type GithubRepo = {
  front_default: string;
};

export type GithubStat = {
  sample_stat: number;
  stat: {
    name: string;
    other: number;
  };
};

export interface GithubLoading {
  type: typeof GITHUB_LOADING;
}

export interface GithubFail {
  type: typeof GITHUB_FAIL;
}

export interface GithubSuccess {
  type: typeof GITHUB_SUCCESS;
  payload: GithubUser;
}

export type GithubDispatchTypes = GithubLoading | GithubFail | GithubSuccess;
