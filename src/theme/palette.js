import { ALERT_PROTO_TYPES } from 'utils/constants';

export default {
  primary: {
    main: '#00748c',
    contrastText: '#fff',
  },
  secondary: {
    main: '#f24024',
    contrastText: '#fff',
  },
  info: {
    main: '#01a1c3',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffc659',
    contrastText: '#fff',
  },
  danger: {
    main: '#f24024',
    contrastText: '#fff',
  },
  alert: {
    main: '#825dde',
    contrastText: '#fff',
  },
  background: {
    default: '#fff',
    primary: '#f6f6f6',
    secondary: '#000000',
  },
  text: {
    primary: '#161616',
    secondary: '#2c2c2c',
  },
  [ALERT_PROTO_TYPES.news]: {
    main: '#01a1c3',
  },
  [ALERT_PROTO_TYPES.survey]: {
    main: '#ffc659',
  },
  [ALERT_PROTO_TYPES.score]: {
    main: '#f24024',
  },
  [ALERT_PROTO_TYPES.promo]: {
    main: '#825dde',
  },
  [ALERT_PROTO_TYPES.gameday]: {
    main: '#2eb100',
  },
};
