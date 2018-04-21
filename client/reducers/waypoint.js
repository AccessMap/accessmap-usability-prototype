import PointFeature from 'utils/geojson';

// Action types
import {
  SET_POI,
} from 'actions';

// Default actions
import { defaultWaypoint as defaults } from './defaults';

// Reducers
const handlePOI = (state = defaults, action) => {
  switch (action.type) {
    case SET_POI:
      return PointFeature(action.payload.lng,
                          action.payload.lat,
                          { name: action.payload.name });
    default:
      return state;
  }
};

export default handlePOI;
