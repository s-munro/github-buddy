import { SET_NAV_DROPDOWN, NavDispatchTypes } from "./navActionTypes";

interface DefaultNavState {
  showDropDown: boolean;
}

const initialState: DefaultNavState = {
  showDropDown: false,
};

export const navReducer = (
  state: DefaultNavState = initialState,
  action: NavDispatchTypes
): DefaultNavState => {
  switch (action.type) {
    case SET_NAV_DROPDOWN:
      return {
        showDropDown: action.payload,
      };
    default:
      return state;
  }
};
