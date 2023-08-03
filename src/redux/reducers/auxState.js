import { handleActions } from 'redux-actions';
import * as ActionTypes from 'redux/actionTypes';
import * as auxStateUpdaters from './auxStateUpdaters';

const actionHandler = {
  [ActionTypes.SET_PATH_TOKENS]: auxStateUpdaters.setPathTokensUpdater,
  [ActionTypes.SET_LOADING_STATUS]: auxStateUpdaters.setLoadingStatusUpdater,
  [ActionTypes.SET_RESPONSE_ERROR]: auxStateUpdaters.setResponseErrorUpdater,
};

export default handleActions(actionHandler, auxStateUpdaters.INITIAL_AUX_STATE);
