import { createAction } from 'redux-actions';
import * as alertsAPI from 'services/api-alerts';
import * as TYPES from 'redux/actionTypes';
import { ALERT_MIXED_TYPES, ALERT_PROTO_TYPES } from 'utils/constants';
import { isEmpty } from 'utils/helpers/utility';
import { setLoadingStatus } from './auxiliary';
import { setResponseSuccess, setResponseError } from '.';

export const createAlert =
  (type, data, scheduledTime = null) =>
  async (dispatch) => {
    dispatch(setLoadingStatus(true));

    try {
      let response;

      if (scheduledTime) {
        response = await alertsAPI.createScheduledNotification({
          ...data,
          type,
          scheduledTime,
        });
      } else {
        response = await alertsAPI.createNotification({ ...data, type });
      }

      dispatch(
        getNotifications(scheduledTime ? ALERT_MIXED_TYPES.scheduled : type)
      );

      dispatch(setResponseSuccess(response));
    } catch (e) {
      dispatch(setResponseError(e.response));
    }

    dispatch(setLoadingStatus(false));
  };

export const insertSavedAlert = (type, data) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.createSavedAlert({ ...data, type });
    dispatch(setResponseSuccess(response));
    await dispatch(getSavedAlerts());
  } catch (e) {
    dispatch(setResponseError(e.response));
  }

  dispatch(setLoadingStatus(false));
};

export const sendSavedAlert = (id) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.sendSavedAlert(id);
    dispatch(setResponseSuccess(response));
  } catch (e) {
    dispatch(setResponseError(e.response));
  }

  dispatch(setLoadingStatus(false));
};

export const modifySavedAlert = (id, params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.updateSavedAlert(id, params);
    dispatch(setResponseSuccess(response));
    await dispatch(getSavedAlerts());
  } catch (e) {
    dispatch(setResponseError(e.response));
  }

  dispatch(setLoadingStatus(false));
};

export const removeSavedAlert = (id) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.deleteSavedAlert(id);
    await dispatch(getSavedAlerts());
    dispatch(setResponseSuccess(response));
  } catch (e) {
    dispatch(setResponseError(e.response));
  }

  dispatch(setLoadingStatus(false));
};

export const modifyScheduledAlert = (id, params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.updateScheduledAlert(id, params);
    dispatch(setResponseSuccess(response));
    dispatch(getNotifications(ALERT_MIXED_TYPES.scheduled));
  } catch (e) {
    dispatch(setResponseError(e.response));
  }

  dispatch(setLoadingStatus(false));
};

export const removeScheduledAlert = (id) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.deleteScheduledAlert(id);
    dispatch(setResponseSuccess(response));
    dispatch(getNotifications(ALERT_MIXED_TYPES.scheduled));
  } catch (e) {
    dispatch(setResponseError(e.response));
  }

  dispatch(setLoadingStatus(false));
};

const PAGE_COUNT = 500;
export const getLatestNewsNotifications =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        notifications: { latestNews },
      } = getState();
      if (!refresh && !isEmpty(latestNews)) {
        return;
      }

      const params = {
        type: ALERT_PROTO_TYPES.news,
        isSent: true,
        skip: 0,
        take: 10,
      };
      const { results = [] } = await alertsAPI.getNotifications(params);

      await dispatch({
        type: TYPES.SET_LATEST_NEWS_NOTIFICATIONS,
        payload: results,
      });
    } catch (error) {
      console.log('[getLatestNewsNotifications] error => ', error);
    }
  };

export const getLatestNotification = (type) => async (dispatch) => {
  try {
    const response = await alertsAPI.getLatestNotification({ type });
    let actionType = TYPES.SET_LATEST_NOTIFICATION;

    switch (type) {
      case ALERT_PROTO_TYPES.survey:
        actionType = TYPES.SET_LATEST_SURVEY_NOTIFICATION;
        break;
      default:
        actionType = TYPES.SET_LATEST_NOTIFICATION;
        break;
    }

    await dispatch({
      type: actionType,
      payload: response,
    });
  } catch (error) {
    dispatch(setResponseError(error));
  }
};

export const setLatestNotification =
  (type, notification) => async (dispatch) => {
    try {
      let actionType = TYPES.SET_LATEST_NOTIFICATION;
      switch (type) {
        case ALERT_PROTO_TYPES.survey:
          actionType = TYPES.SET_LATEST_SURVEY_NOTIFICATION;
          break;
        default:
          actionType = TYPES.SET_LATEST_NOTIFICATION;
          break;
      }

      await dispatch({
        type: actionType,
        payload: notification,
      });
    } catch (error) {
      dispatch(setResponseError(error));
    }
  };

export const setAlerts = createAction(TYPES.SET_ALERTS, (payload) => payload);

export const getSavedAlerts = (params) => async (dispatch) => {
  try {
    const res = await alertsAPI.getNotifications({ ...params, isSaved: true });
    dispatch(setAlerts({ ...res, type: ALERT_MIXED_TYPES.saved }));
  } catch (e) {
    dispatch(setResponseError(e.response));
  }
};

export const getNotifications =
  (type = '', take = PAGE_COUNT, startDate = null, endDate = null) =>
  async (dispatch) => {
    dispatch(setLoadingStatus(true));
    try {
      let params = {};
      if (!!type) {
        params = {
          type,
          isSent: true,
          skip: 0,
          take,
          startDate,
          endDate,
        };
      }
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const { results = [], total = 0 } = await (type ===
        ALERT_MIXED_TYPES.scheduled
        ? alertsAPI.getScheduledNotifications
        : startDate
        ? alertsAPI.getAlertsByDateRange
        : alertsAPI.getNotifications)(params);

      dispatch({
        type: TYPES.SET_ALERTS,
        payload: {
          results,
          total,
          type,
        },
      });
    } catch (error) {
      dispatch(setResponseError(error));
    }

    dispatch(setLoadingStatus(false));
  };

export const setNotifications =
  (type = '', results = []) =>
  async (dispatch, getState) => {
    try {
      const { notifications } = getState();
      const { total = 0 } = notifications[type];

      await dispatch({
        type: TYPES.SET_ALERTS,
        payload: {
          results,
          total,
          type,
        },
      });
    } catch (error) {
      dispatch(setResponseError(error));
    }
  };

export const setSelectedDate = (date) => ({
  type: TYPES.SELECT_DATE,
  payload: date,
});

export const setAlertToShow = (alert, visibility) => ({
  type: TYPES.SET_ALERT_TO_SHOW,
  payload: { alert, visibility },
});

export const getGamedayPresets =
  (reloading = false) =>
  async (dispatch, getState) => {
    try {
      const {
        notifications: { gamedayPresets },
      } = getState();

      if (gamedayPresets.length && !reloading) {
        return;
      }

      const { images: presets } = await alertsAPI.readGamedayPresets();
      dispatch(setGamedayPresets(presets));
    } catch (err) {
      dispatch(setResponseError(err));
    }
  };

export const setGamedayPresets = (presets) => ({
  type: TYPES.SET_GAMEDAY_PRESETS,
  payload: presets,
});

export const uploadGamedayPresets = (files) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const res = await alertsAPI.uploadGamedayPresets(files);
    dispatch(setResponseSuccess(res));
    dispatch(getGamedayPresets(true));
  } catch (err) {
    dispatch(setResponseError(err));
  }

  dispatch(setLoadingStatus(false));
};
