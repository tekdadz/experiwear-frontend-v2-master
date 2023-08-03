import * as authAPI from 'services/api-auth';
import * as ActionTypes from 'redux/actionTypes';
import { setLoadingStatus, setResponseError } from '.';
import { extractHostAddr } from 'utils/helpers';
import {
  PROXY_URL,
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  FAKE_COOKIE,
} from '../../config';

export const setUserAuthStatus = (isAuthenticated, userInfo = {}) => {
  localStorage.setItem('isAuthenticated', isAuthenticated);
  localStorage.setItem('currentUser', JSON.stringify(userInfo));

  return {
    type: ActionTypes.SET_USER_AUTH_STATUS,
    payload: { isAuthenticated, userInfo },
  };
};

export const signIn = (params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const user = await authAPI.login(params);

    // Set fake cookie for middleware authenticated routing if api proxy has cors.
    if (extractHostAddr(location.origin) !== extractHostAddr(PROXY_URL)) {
      const date = new Date();
      date.setTime(date.getTime() + COOKIE_MAX_AGE);
      document.cookie = `${COOKIE_NAME}=fake_cookie; expires=${date.toUTCString()}; path=/`;
    }

    dispatch(setUserAuthStatus(true, user));
  } catch (err) {
    dispatch(setResponseError(err, true, 'Invalid email or password!'));
  }

  dispatch(setLoadingStatus(false));
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const user = await authAPI.isAuthenticated();
    dispatch(setUserAuthStatus(true, user));
  } catch (err) {
    dispatch(setResponseError(err));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authAPI.logout();
    localStorage.clear();

    // Clear fake cookie for middleware authenticated routing if api proxy has cors.
    if (extractHostAddr(location.origin) !== extractHostAddr(PROXY_URL)) {
      document.cookie = `${COOKIE_NAME}=${FAKE_COOKIE}; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
    }

    dispatch(setUserAuthStatus(false));
  } catch (err) {
    dispatch(setResponseError(err));
  }
};
