import * as ActionTypes from 'redux/actionTypes';
import { showSuccessToast, showErrorToast } from 'utils/helpers';
import { setUserAuthStatus } from '.';

export const setPathTokens = (tokens) => ({
  type: ActionTypes.SET_PATH_TOKENS,
  payload: tokens,
});

export const setLoadingStatus = (loadingStatus) => ({
  type: ActionTypes.SET_LOADING_STATUS,
  payload: loadingStatus,
});

export const setResponseSuccess = (response) => {
  showSuccessToast(response?.message || 'Successfully Executed!');

  return {
    type: ActionTypes.SET_RESPONSE_SUCCESS,
    payload: response,
  };
};

export const setResponseError =
  (error, showAlert = true, message = '') =>
  (dispatch) => {
    if (error.status === 401) {
      dispatch(setUserAuthStatus(false));
    }

    dispatch({
      type: ActionTypes.SET_RESPONSE_ERROR,
      payload: { ...error, message },
    });

    if (showAlert) {
      showErrorToast(
        message ||
          error.data?.message?.toString() ||
          error.message ||
          'Something went wrong!'
      );
    }
  };
