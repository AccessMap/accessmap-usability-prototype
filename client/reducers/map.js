import { combineReducers } from 'redux';

import {
  CLEAR_SELECTED_FEATURES,
  MAP_CLICK,
  TOGGLE_UPHILL,
} from 'actions';

import { defaultMap } from './defaults';

const handleInclineUphill = (state = defaultMap.inclineUphill, action) => {
  switch (action.type) {
    case TOGGLE_UPHILL:
      return !state;
    default:
      return state;
  }
};

const handleSelectedFeature = (state = defaultMap.selectedFeature, action) => {
  switch (action.type) {
    case MAP_CLICK: {
      const feature = action.payload.features[0];
      // If it's a map click elsewhere, clear everything
      if (!feature) return null;

      // If it's a special map feature, add extra info
      switch (feature.layer.source) {
        case 'sidewalks':
          return {
            layer: 'sidewalk',
            layerName: 'Sidewalk',
            location: action.payload.location,
            properties: {
              description: `${feature.properties.side} of ${feature.properties.street_name}`,
              incline: feature.properties.incline / 1000,
              surface: feature.properties.surface,
            },
          };
        default:
          return null;
      }
    } case CLEAR_SELECTED_FEATURES: {
      return null;
    }
    default:
      return state;
  }
};

export default combineReducers({
  inclineUphill: handleInclineUphill,
  selectedFeature: handleSelectedFeature,
});
