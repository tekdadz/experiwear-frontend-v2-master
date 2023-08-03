import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import combinedReducer from 'redux/reducers';

const bindMiddleWares = (middleWares) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleWares));
  }
  return applyMiddleware(...middleWares);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  createStore(reducer, bindMiddleWares([thunkMiddleware]));

export const wrapper = createWrapper(makeStore, { debug: false });
