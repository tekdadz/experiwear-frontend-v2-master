import * as TYPES from 'redux/actionTypes';

const INITIAL_STATE = Object.freeze({
  results: [],
  selectedGame: null,
  closestUpcoming: {},
});

const gamesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_GAMES:
      return { ...state, results: action.payload };
    case TYPES.SET_SELECTED_GAME:
      return { ...state, selectedGame: action.payload };
    case TYPES.SET_CLOSEST_UPCOMING_GAME:
      return { ...state, closestUpcoming: action.payload };
    default:
      return state;
  }
};

export default gamesReducer;
