import { combineReducers } from 'redux';

import browser from './browser';
import inclineRanges from './incline-ranges';
import log from './log';
import map from './map';
import view from './view';
import waypoint from './waypoint';

/**
 * Routing to be implemented
 */
export default combineReducers({
  browser,
  inclineRanges,
  log,
  map,
  view,
  waypoint,
});
