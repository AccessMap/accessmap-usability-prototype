// Action types
import {
  SET_DOWNHILL_MAX,
  SET_DOWNHILL_MIN,
  SET_UPHILL_MAX,
  SET_UPHILL_MIN,
} from 'actions';

// Default actions
import { defaultInclineRanges as defaults } from './defaults';

const handleInclineRanges = (state = defaults, action) => {
  switch (action.type) {
    case SET_DOWNHILL_MAX:
      return {
        ...state,
        inclineDownhillMax: action.payload >= state.inclineDownhillMin ?
          action.payload :
          state.inclineDownhillMax,
      };
    case SET_DOWNHILL_MIN:
      return {
        ...state,
        inclineDownhillMin: action.payload <= state.inclineDownhillMax ?
          action.payload :
          state.inclineDownhillMin,
      };
    case SET_UPHILL_MAX:
      return {
        ...state,
        inclineUphillMax: action.payload >= state.inclineUphillMin ?
          action.payload :
          state.inclineUphillMax,
      };
    case SET_UPHILL_MIN:
      return {
        ...state,
        inclineUphillMin: action.payload <= state.inclineUphillMax ?
          action.payload :
          state.inclineUphillMin,
      };
    default:
      return state;
  }
};


export default handleInclineRanges;
