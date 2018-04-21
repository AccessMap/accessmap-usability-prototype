import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MapMarker from 'components/MapMarker';


const Waypoints = (props) => {
  const {
    poi,
    selectedFeature,
  } = props;

  const waypoints = [];
  if (selectedFeature) {
    waypoints.push(
      <MapMarker
        coordinates={selectedFeature.location}
      />,
    );
  }

  if (poi) {
    waypoints.push(
      <MapMarker
        coordinates={poi.geometry.coordinates}
      />,
    );
  }

  return (
    <React.Fragment>
      {waypoints}
    </React.Fragment>
  );
};

Waypoints.propTypes = {
  poi: PropTypes.shape({
    geometry: PropTypes.shape({
      type: PropTypes.oneOf(['Point']),
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    type: PropTypes.oneOf(['Feature']),
  }),
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
    properties: PropTypes.object,
  }),
};

Waypoints.defaultProps = {
  poi: null,
  selectedFeature: null,
};

const mapStateToProps = (state) => {
  const {
    map,
    waypoint,
  } = state;

  return {
    poi: waypoint,
    selectedFeature: map.selectedFeature,
  };
};

export default connect(
  mapStateToProps,
)(Waypoints);
