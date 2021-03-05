import { SET_NAV_DROPDOWN } from "./navActionTypes";

export const setNavDropDown = (status: boolean) => {
  return {
    type: SET_NAV_DROPDOWN,
    payload: status,
  };
};
