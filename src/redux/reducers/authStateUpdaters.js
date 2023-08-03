export const INITIAL_AUTH_STATE = {
  isAuthenticated: false,
  currentUser: {},
  error: null,
};

export const setUserAthStatusUpdater = (state, { payload }) => ({
  ...state,
  isAuthenticated: payload.isAuthenticated,
  currentUser: payload.userInfo,
  error: payload.error,
});
