export const updateSession = (newSession: string) => {
  return {
    type: "UPDATE_SESSION",
    payload: newSession,
  };
};
