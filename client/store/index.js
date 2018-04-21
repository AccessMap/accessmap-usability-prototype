import { createStore, applyMiddleware } from 'redux';

import rootReducer from 'reducers';

const middlewares = [];

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);
