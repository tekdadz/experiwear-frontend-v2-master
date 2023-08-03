import * as TYPES from 'redux/actionTypes';
import moment from 'moment';
import _ from 'lodash';
import { ALERT_MIXED_TYPES, ALERT_PROTO_TYPES } from 'utils/constants';

const INITIAL_STATE = Object.freeze({
  ...Object.values(ALERT_PROTO_TYPES).reduce(
    (acc, type) => ({ ...acc, [type]: { results: [], total: 0 } }),
    {}
  ),
  ...Object.values(ALERT_MIXED_TYPES).reduce(
    (acc, type) => ({ ...acc, [type]: { results: [], total: 0 } }),
    {}
  ),
  latest: {},
  latestSurvey: {},
  latestNews: [],
  selectedDate: new Date(),
  alertStatus: {},
  alertsToShow: Object.values(ALERT_PROTO_TYPES).reduce(
    (acc, type) => ({ ...acc, [type]: true }),
    {}
  ),
  acc: {
    results: [],
    total: 0,
  },
  gamedayPresets: [],
});

const alertsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_ALERTS:
      const { type, results, total } = action.payload;

      if (type) {
        return { ...state, [type]: action.payload };
      }

      const grouped = _.groupBy(
        results
          .filter((n) => n.isSent)
          .map((n) => ({
            ...n,
            date: moment(n.createdAt).format('YYYY-MM-DD'),
          })),
        'date'
      );

      for (let date in grouped) {
        grouped[date] = grouped[date].reduce(
          (acc, n) => ({
            ...acc,
            [n.type]: true,
          }),
          {}
        );
      }

      return { ...state, all: { results, total }, alertStatus: grouped };
    case TYPES.SET_LATEST_NOTIFICATION:
      return { ...state, latest: action.payload };
    case TYPES.SET_LATEST_SURVEY_NOTIFICATION:
      return { ...state, latestSurvey: action.payload };
    case TYPES.SET_LATEST_NEWS_NOTIFICATIONS:
      return { ...state, latestNews: action.payload };
    case TYPES.SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    case TYPES.SET_ALERT_TO_SHOW:
      const { alert, visibility } = action.payload;
      const { alertsToShow } = state;
      return {
        ...state,
        alertsToShow: { ...alertsToShow, [alert]: visibility },
      };
    case TYPES.SET_GAMEDAY_PRESETS:
      return {
        ...state,
        gamedayPresets: action.payload,
      };
    default:
      return state;
  }
};

export default alertsReducer;
