export const FANBAND_TYPES = Object.freeze({
  all: 'all',
  provisioned: 'provisioned',
  nonProvisioned: 'nonProvisioned',
});

export const FANBAND_LABELS = Object.freeze({
  [FANBAND_TYPES.all]: 'ALL',
  [FANBAND_TYPES.provisioned]: 'PROVISIONED',
  [FANBAND_TYPES.nonProvisioned]: 'NON-PROVISIONED',
});

export const ALERT_PROTO_TYPES = Object.freeze({
  news: 'news',
  survey: 'survey',
  score: 'scoreAlert',
  promo: 'promo',
  gameday: 'gameday',
});

export const ALERT_PROTO_LABELS = Object.freeze({
  [ALERT_PROTO_TYPES.news]: 'News',
  [ALERT_PROTO_TYPES.survey]: 'QuickPoll',
  [ALERT_PROTO_TYPES.score]: 'Score',
  [ALERT_PROTO_TYPES.promo]: 'Promo',
  [ALERT_PROTO_TYPES.gameday]: 'Gameday',
});

export const ALERT_MIXED_TYPES = Object.freeze({
  all: 'all',
  scheduled: 'scheduled',
  saved: 'saved',
});

export const ANSWER_ENUM = Object.freeze({
  NO: 0,
  YES: 1,
  IGNORED: 2,
});

export const GAME_STATUS = Object.freeze({
  scheduled: 1,
  inProgress: 2,
  finished: 3,
});

export const WS_EVENTS = Object.freeze({
  FANBAND_IN_AREA: 'USER_IN_AREA',
  FANBAND_STATUS: 'USER_STATUS',
  FANBAND_REACT: 'USER_REACT',
  FANBAND_ANSWER: 'USER_ANSWER',
  UPCOMING_SCHEDULED_NOTIFICATION: 'UPCOMING_SCHEDULED_NOTIFICATION',
  LIVE_GAME_UPDATE: 'LIVE_GAME_UPDATE',
});

export const VIB_TYPES = Object.freeze({
  quickBursts: 'quickBursts',
  longVibrate: 'longVibrate',
  none: 'none',
});

export const VIB_INTENSITIES = Object.freeze({
  no: 'noVibration',
  low: 'low',
  medium: 'medium',
  high: 'high',
});

export const LED_TYPES = Object.freeze({
  flashing: 'flashing',
  stable: 'stable',
  none: 'none',
});

export const PRESET_PATTERNS = [
  {
    // label: 'All Red',
    presetPatternIndex: 0,
    topColor1: 'rgb(255,0,0)',
    topColor2: 'rgb(255,0,0)',
    topColor3: 'rgb(255,0,0)',
    bottomColor1: 'rgb(255,0,0)',
    bottomColor2: 'rgb(255,0,0)',
    bottomColor3: 'rgb(255,0,0)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'All Green',
    presetPatternIndex: 1,
    topColor1: 'rgb(0,255,0)',
    topColor2: 'rgb(0,255,0)',
    topColor3: 'rgb(0,255,0)',
    bottomColor1: 'rgb(0,255,0)',
    bottomColor2: 'rgb(0,255,0)',
    bottomColor3: 'rgb(0,255,0)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'All Blue',
    presetPatternIndex: 2,
    topColor1: 'rgb(0,0,255)',
    topColor2: 'rgb(0,0,255)',
    topColor3: 'rgb(0,0,255)',
    bottomColor1: 'rgb(0,0,255)',
    bottomColor2: 'rgb(0,0,255)',
    bottomColor3: 'rgb(0,0,255)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'All Yellow',
    presetPatternIndex: 3,
    topColor1: 'rgb(255,233,0)',
    topColor2: 'rgb(255,233,0)',
    topColor3: 'rgb(255,233,0)',
    bottomColor1: 'rgb(255,233,0)',
    bottomColor2: 'rgb(255,233,0)',
    bottomColor3: 'rgb(255,233,0)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'All Orange',
    presetPatternIndex: 4,
    topColor1: 'rgb(255,164,0)',
    topColor2: 'rgb(255,164,0)',
    topColor3: 'rgb(255,164,0)',
    bottomColor1: 'rgb(255,164,0)',
    bottomColor2: 'rgb(255,164,0)',
    bottomColor3: 'rgb(255,164,0)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'All Purple',
    presetPatternIndex: 5,
    topColor1: 'rgb(172,79,198)',
    topColor2: 'rgb(172,79,198)',
    topColor3: 'rgb(172,79,198)',
    bottomColor1: 'rgb(172,79,198)',
    bottomColor2: 'rgb(172,79,198)',
    bottomColor3: 'rgb(172,79,198)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'Half Red/Blue',
    presetPatternIndex: 6,
    topColor1: 'rgb(255,0,0)',
    topColor2: 'rgb(255,0,0)',
    topColor3: 'rgb(255,0,0)',
    bottomColor1: 'rgb(0,0,255)',
    bottomColor2: 'rgb(0,0,255)',
    bottomColor3: 'rgb(0,0,255)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'Half Red/Green',
    presetPatternIndex: 7,
    topColor1: 'rgb(255,0,0)',
    topColor2: 'rgb(255,0,0)',
    topColor3: 'rgb(255,0,0)',
    bottomColor1: 'rgb(0,255,0)',
    bottomColor2: 'rgb(0,255,0)',
    bottomColor3: 'rgb(0,255,0)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'All American',
    presetPatternIndex: 8,
    topColor1: 'rgb(255,0,0)',
    topColor2: 'rgb(0,0,0)',
    topColor3: 'rgb(0,0,255)',
    bottomColor1: 'rgb(255,0,0)',
    bottomColor2: 'rgb(0,0,0)',
    bottomColor3: 'rgb(0,0,255)',
    vibrationIntensity: VIB_INTENSITIES.high,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 10,
    ledType: LED_TYPES.flashing,
  },
  {
    // label: 'None',
    presetPatternIndex: 9,
    topColor1: 'rgb(0,0,0)',
    topColor2: 'rgb(0,0,0)',
    topColor3: 'rgb(0,0,0)',
    bottomColor1: 'rgb(0,0,0)',
    bottomColor2: 'rgb(0,0,0)',
    bottomColor3: 'rgb(0,0,0)',
    vibrationIntensity: VIB_INTENSITIES.no,
    vibrationType: VIB_TYPES.none,
    duration: 0,
    ledType: LED_TYPES.none,
  },
];

export const DEFAULT_ALERT_PARAMS = () => {
  if (typeof window !== 'undefined') {
    const localData = localStorage.getItem('default_alert_params');

    if (localData) {
      return JSON.parse(localData);
    }
  }

  return PRESET_PATTERNS[0];
};

export const ALERT_FORM_MODES = Object.freeze({
  creating: 'creating',
  updating: 'updating',
  saving: 'saving',
});

export const ALERT_STATUS = Object.freeze({
  pending: 'pending',
  sent: 'sent',
});

export const ALERT_STATUS_LABELS = Object.freeze({
  [ALERT_STATUS.pending]: 'Pending',
  [ALERT_STATUS.sent]: 'Sent',
});

export const MOBILE_OS = Object.freeze({
  android: 'android',
  iOS: 'iOS',
  windowsPhone: 'windowsPhone',
  unknown: 'unknown',
});

export const LINKS = Object.freeze({
  signIn: {
    title: 'Sign In',
    path: '/auth/sign-in',
    protected: false,
  },
  forgotPassword: {
    title: 'Forgot Password',
    path: '/auth/forgot-password',
    protected: false,
  },
  resetPassword: {
    title: 'Reset Password',
    path: '/auth/reset-password',
    protected: false,
  },
  home: {
    title: 'Home',
    path: '/',
    protected: true,
  },
  selectedGame: {
    title: 'Selected Game',
    path: '/selected-game',
    protected: true,
  },
  stats: {
    title: 'Stats',
    path: '/stats',
    protected: true,
  },
  statsFanbands: {
    title: 'Fanbands',
    path: '/stats/fanbands',
    protected: true,
  },
  news: {
    title: 'News',
    path: '/news',
    protected: true,
  },
  newsSent: {
    title: 'News alerts sent',
    path: '/news/news-sent',
    protected: true,
  },
  quickPoll: {
    title: 'Quick Poll',
    path: '/quickpoll',
    protected: true,
  },
  quickPollSent: {
    title: 'All quick polls',
    path: '/quickpoll/quickpoll-sent',
    protected: true,
  },
  quickPollSample: {
    title: 'Quick Poll Alert Sample',
    path: '/quickpoll/quickpoll-sent/:id',
    protected: true,
  },
  score: {
    title: 'Score',
    path: '/score',
    protected: true,
  },
  scoreSent: {
    title: 'Score alerts sent',
    path: '/score/score-sent',
    protected: true,
  },
  promo: {
    title: 'Promo',
    path: '/promo',
    protected: true,
  },
  promoSent: {
    title: 'Promo alerts sent',
    path: '/promo/promo-sent',
    protected: true,
  },
  schedule: {
    title: 'Schedule',
    path: '/schedule',
    protected: true,
  },
  scheduleSent: {
    title: 'Active scheduled alerts',
    path: '/schedule/schedule-sent',
    protected: true,
  },
  scheduledEdit: {
    title: 'Edit Scheduled alert',
    token: 'Edit',
    path: '/schedule/:id',
    protected: true,
  },
  gameday: {
    title: 'Gameday Theme',
    path: '/gameday',
    protected: true,
  },
  gamedaySent: {
    title: 'Gameday alerts sent',
    path: '/gameday/gameday-sent',
    protected: true,
  },
  saved: {
    title: 'Saved alerts',
    path: '/saved',
    protected: true,
  },
  savedAll: {
    title: 'Saved alerts',
    token: 'View all',
    path: '/saved/view-all',
    protected: true,
  },
  savedEdit: {
    title: 'Edit Saved alert',
    token: 'Edit',
    path: '/saved/:id',
    protected: true,
  },
  tickets: {
    title: 'Manage Tickets',
    path: '/tickets',
    protected: true,
  },
  ticketModify: {
    title: 'Manage Tickets',
    token: 'Modify Ticket',
    path: '/tickets/:id',
    protected: true,
  },
});
