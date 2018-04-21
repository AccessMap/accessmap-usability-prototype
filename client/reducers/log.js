import { combineReducers } from 'redux';

// Action types
import {
  RESIZE_OMNICARD,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleOmniCardDim = (state = defaults.omniCardDim, action) => {
  switch (action.type) {
    case RESIZE_OMNICARD:
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  omniCardDim: handleOmniCardDim,
});
