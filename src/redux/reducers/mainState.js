import { handleActions } from 'redux-actions';
import * as ActionTypes from 'redux/actionTypes';
import * as mainStateUpdaters from './mainStateUpdaters';

const actionHandler = {
  [ActionTypes.SET_TICKETS]: mainStateUpdaters.setTicketsUpdater,
  [ActionTypes.SET_TICKETS_UPLOADING_PROGRESS]:
    mainStateUpdaters.setTicketsUploadingProgressUpdater,
  [ActionTypes.SET_UPLOADED_TICKETS]:
    mainStateUpdaters.setUploadedTicketsUpdater,
  [ActionTypes.SET_FANBANDS]: mainStateUpdaters.setFanbandsUpdater,
  [ActionTypes.SET_FANBANDS_STATISTICS]:
    mainStateUpdaters.setFanbandsStatisticsUpdater,
};

export default handleActions(
  actionHandler,
  mainStateUpdaters.INITIAL_MAIN_STATE
);
