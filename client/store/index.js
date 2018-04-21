import { createStore, applyMiddleware } from 'redux';

import analytics from 'redux-analytics';
import rakam from 'rakam-js';

import rootReducer from 'reducers';

const middlewares = [];

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

//
// Rakam analytics support - using npm package appears to be uncommon, but
// is nice for consistency and bundling
//
// TODO: get user settings to set this on production server. Override is just
// for doing one-off user testing studies (NOT main site).

// Root URL + /analytics
const analyticsURL = `//${window.location.host}/analytics`;
const analyticsWriteKey = process.env.ANALYTICS_KEY;
rakam.init(analyticsWriteKey, null, {
  apiEndpoint: analyticsURL,
  includeUtm: true,
  trackClicks: true,
  trackForms: true,
  includeReferrer: true,
});

const analyticsMiddleware = analytics(({ type, payload }, state) => {
  if (state.analytics || state.analytics == null) {
    rakam.logEvent(type, { ...payload });
  }
});

middlewares.push(analyticsMiddleware);

export default createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);
