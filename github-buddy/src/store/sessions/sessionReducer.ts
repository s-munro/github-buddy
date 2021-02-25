interface DefaultStateI {}

const initialState: DefaultStateI = {};

export const sessionReducer = (
  state: DefaultStateI = initialState,
  action: any
): DefaultStateI => {
  return state;
};
