export const SET_NAV_DROPDOWN = "SET_NAV_DROPDOWN";

export interface setNavDropDown {
  type: typeof SET_NAV_DROPDOWN;
  payload: boolean;
}
export type NavDispatchTypes = setNavDropDown;
