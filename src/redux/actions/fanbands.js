import { createAction } from 'redux-actions';
import * as ActionTypes from 'redux/actionTypes';
import { readFanbands, readFanbandsStatistics } from 'services/api-fanbands';
import { FANBAND_TYPES } from 'utils/constants';
import { setResponseError } from '.';

export const setFanbands = createAction(
  ActionTypes.SET_FANBANDS,
  (payload) => payload
);
export const setFanbandsStatistics = createAction(
  ActionTypes.SET_FANBANDS_STATISTICS,
  (payload) => payload
);

export const getFanbands =
  (pageType = FANBAND_TYPES.all) =>
  async (dispatch) => {
    try {
      const fanbands = await readFanbands({ pageType });
      dispatch(setFanbands(fanbands));
    } catch (e) {
      dispatch(setResponseError(e.response));
    }
  };

export const getFanbandsStatistics = () => async (dispatch) => {
  try {
    const response = await readFanbandsStatistics();
    dispatch(setFanbandsStatistics(response));
  } catch (error) {
    dispatch(setResponseError(error));
  }
};
