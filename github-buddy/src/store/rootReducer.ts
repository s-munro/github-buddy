import { combineReducers } from "redux";
import { sessionReducer } from "./sessions/sessionReducer";
import { githubReducer } from "./github/githubReducer";
import { navReducer } from "./nav/navReducer";
export const rootReducer = combineReducers({
  session: sessionReducer,
  github: githubReducer,
  nav: navReducer,
});
