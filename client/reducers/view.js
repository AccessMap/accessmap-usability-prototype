// Action types
import {
  MAP_MOVE,
  SET_POI,
  SET_CENTER,
  SET_ZOOM,
  SET_CENTER_AND_ZOOM,
} from 'actions';

// Default actions
import { defaultView as defaults } from './defaults';

export default (state = defaults, action) => {
  switch (action.type) {
    case SET_POI: {
      return {
        ...state,
        lng: action.payload.lng,
        lat: action.payload.lat,
        zoom: 17,
      };
    }
    case SET_CENTER:
      return { ...state, lng: action.payload[0], lat: action.payload[1] };
    case SET_ZOOM:
      return { ...state, zoom: action.payload };
    case SET_CENTER_AND_ZOOM:
      return {
        ...state,
        lng: action.payload.center[0],
        lat: action.payload.center[1],
        zoom: action.payload.zoom,
      };
    case MAP_MOVE:
      return {
        ...state,
        lng: action.payload.center[0],
        lat: action.payload.center[1],
        zoom: action.payload.zoom,
      };
    default:
      return state;
  }
};
