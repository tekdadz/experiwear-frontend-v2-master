export const INITIAL_AUX_STATE = {
  pathTokens: [],
  loadingStatus: false,
  error: null,
  loadingCount: 0,
};

export const setPathTokensUpdater = (state, { payload }) => ({
  ...state,
  pathTokens: [{ path: '/', title: 'Experiwear' }, ...payload],
});

export const setLoadingStatusUpdater = (state, { payload }) => {
  let { loadingCount } = state;
  loadingCount = payload
    ? ++loadingCount
    : loadingCount > 0
    ? --loadingCount
    : 0;

  return {
    ...state,
    loadingCount,
    loadingStatus: loadingCount > 0,
  };
};

export const setResponseErrorUpdater = (state, { payload }) => ({
  ...state,
  error: payload,
});
