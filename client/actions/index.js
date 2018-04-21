// Action types

// Map view settings
export const MAP_MOVE = 'MAP_MOVE';
export const SET_CENTER = 'SET_CENTER';
export const SET_CENTER_AND_ZOOM = 'SET_CENTER_AND_ZOOM';
export const SET_POI = 'SET_POI';
export const SET_ZOOM = 'SET_ZOOM';

// Map interactions
export const CLEAR_SELECTED_FEATURES = 'CLEAR_SELECTED_FEATURES';
export const MAP_CLICK = 'MAP_CLICK';

// Browser / load events
export const LOAD_APP = 'LOAD_APP';
export const LOAD_MAP = 'LOAD_MAP';
export const RESIZE_MAP = 'RESIZE_MAP';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';

// Logging - track map view info, but isolated to prevent infinite recursion
export const LOG_BOUNDS = 'LOG_BOUNDS';
export const RESIZE_OMNICARD = 'RESIZE_OMNICARD';

export const SET_DOWNHILL_MAX = 'SET_DOWNHILL_MAX';
export const SET_DOWNHILL_MIN = 'SET_DOWNHILL_MIN';
export const SET_UPHILL_MAX = 'SET_UPHILL_MAX';
export const SET_UPHILL_MIN = 'SET_UPHILL_MIN';
export const TOGGLE_UPHILL = 'TOGGLE_UPHILL';

// New action creators
export const setDownhillMax = incline => ({
  type: SET_DOWNHILL_MAX,
  payload: incline,
});

export const setDownhillMin = incline => ({
  type: SET_DOWNHILL_MIN,
  payload: incline,
});

export const setUphillMax = incline => ({
  type: SET_UPHILL_MAX,
  payload: incline,
});

export const setUphillMin = incline => ({
  type: SET_UPHILL_MIN,
  payload: incline,
});

export const toggleUphill = () => ({
  type: TOGGLE_UPHILL,
});

// Action creators
export const setPOI = (lng, lat, name) => ({
  type: SET_POI,
  payload: { lng, lat, name },
});

export const loadApp = () => ({ type: LOAD_APP });

export const loadMap = (width, height) => ({
  type: LOAD_MAP,
  payload: {
    width,
    height,
  },
});

export const resizeMap = (width, height) => ({
  type: RESIZE_MAP,
  payload: { width, height },
});

export const logBounds = bounds => ({
  type: LOG_BOUNDS,
  payload: bounds,
});

export const resizeOmniCard = (height, width) => ({
  type: RESIZE_OMNICARD,
  payload: { height, width },
});

export const setCenter = center => ({ type: SET_CENTER, payload: center });

export const setZoom = zoom => ({ type: SET_ZOOM, payload: zoom });

// Useful for when you want to set both: if you just used setCenter and
// setZoom, you can get race conditions due to the map also updating state
// when it's finished zooming/moving
export const setCenterAndZoom = (center, zoom) => ({
  type: SET_CENTER_AND_ZOOM,
  payload: {
    center,
    zoom,
  },
});

export const mapMove = (center, zoom, bounds) => ({
  type: MAP_MOVE,
  payload: {
    center,
    zoom,
    bounds,
  },
});

export const resizeWindow = () => ({
  type: RESIZE_WINDOW,
});


// TODO: include centerpoint? Gotta know where to show popups!
export const mapClick = (features, location) => ({
  type: MAP_CLICK,
  payload: { features, location },
});


export const clearSelectedFeatures = () => ({
  type: CLEAR_SELECTED_FEATURES,
});
