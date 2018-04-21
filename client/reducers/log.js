// Action types
import {
  RATE_SIDEWALK,
  UNDO_RATE_SIDEWALK,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleLog = (state = defaults, action) => {
  const log = state.slice();
  switch (action.type) {
    case RATE_SIDEWALK:
      log.push(action);
      return log;
    case UNDO_RATE_SIDEWALK:
      log.pop();
      return log;
    default:
      return state;
  }
};


export default handleLog;
