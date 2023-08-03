import { handleActions } from 'redux-actions';
import * as ActionTypes from 'redux/actionTypes';
import * as authStateUpdaters from './authStateUpdaters';

const actionHandler = {
  [ActionTypes.SET_USER_AUTH_STATUS]: authStateUpdaters.setUserAthStatusUpdater,
};

export default handleActions(
  actionHandler,
  authStateUpdaters.INITIAL_AUTH_STATE
);
