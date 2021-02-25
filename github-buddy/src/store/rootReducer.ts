import { combineReducers } from "redux";
import { sessionReducer } from "./sessions/sessionReducer";
import { githubReducer } from "./github/githubReducer";
export const rootReducer = combineReducers({
  session: sessionReducer,
  github: githubReducer,
});
