import { combineReducers } from 'redux';

import authReducer from './authState';
import alertsReducer from './alertsReducer';
import gamesReducer from './gamesReducer';
import auxReducer from './auxState';
import mainReducer from './mainState';

export default combineReducers({
  auth: authReducer,
  notifications: alertsReducer,
  games: gamesReducer,
  aux: auxReducer,
  main: mainReducer,
});
