import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';


const Sidewalks = (props) => {
  const {
    inclineDownhillMax,
    inclineDownhillMin,
    inclineUphillMax,
    inclineUphillMin,
    uphillMode,
  } = props;

  const max = uphillMode ? inclineUphillMax : inclineDownhillMax;
  const min = uphillMode ? inclineUphillMin : inclineDownhillMin;

  // Note: the nested `cases` are just a way to get around not having an
  // absolute value function in Mapbox's expressions
  const visible = [
    'case',
    [
      '>',
      [
        'case',
        [
          '<',
          ['to-number', ['get', 'incline']],
          0,
        ],
        ['*', -1, ['to-number', ['get', 'incline']]],
        ['to-number', ['get', 'incline']],
      ],
      max,
    ],
    false,
    [
      '<',
      [
        'case',
        [
          '<',
          ['to-number', ['get', 'incline']],
          0,
        ],
        ['*', -1, ['to-number', ['get', 'incline']]],
        ['to-number', ['get', 'incline']],
      ],
      min,
    ],
    false,
    true,
  ];

  return (
    <React.Fragment>
      <Layer
        id='sidewalk-click'
        type='line'
        sourceId='sidewalks'
        filter={visible}
        paint={{
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]],
          },
          'line-opacity': 0,
        }}
        before='bridge-street'
      />
      <Layer
        id='sidewalk-outline'
        type='line'
        sourceId='sidewalks'
        layout={{ 'line-cap': 'round' }}
        filter={visible}
        paint={{
          'line-color': '#000',
          'line-width': {
            stops: [[14, 0.00], [20, 1]],
          },
          'line-opacity': {
            stops: [[13.5, 0.0], [16, 1]],
          },
          'line-gap-width': {
            stops: [[12, 0.5], [16, 3], [22, 30]],
          },
        }}
        before='bridge-street'
      />
      <Layer
        id='sidewalk'
        type='line'
        sourceId='sidewalks'
        layout={{ 'line-cap': 'round' }}
        filter={visible}
        paint={{
          'line-color': uphillMode ? 'red' : 'blue',
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]],
          },
        }}
        before='bridge-street'
      />
    </React.Fragment>
  );
};

Sidewalks.propTypes = {
  inclineDownhillMax: PropTypes.number.isRequired,
  inclineDownhillMin: PropTypes.number.isRequired,
  inclineUphillMax: PropTypes.number.isRequired,
  inclineUphillMin: PropTypes.number.isRequired,
  uphillMode: PropTypes.bool.isRequired,
};

Sidewalks.defaultProps = {
  inclineUphill: true,
};

const mapStateToProps = (state) => {
  const {
    inclineRanges,
    map,
  } = state;

  return {
    inclineDownhillMax: inclineRanges.inclineDownhillMax,
    inclineDownhillMin: inclineRanges.inclineDownhillMin,
    inclineUphillMax: inclineRanges.inclineUphillMax,
    inclineUphillMin: inclineRanges.inclineUphillMin,
    uphillMode: map.inclineUphill,
  };
};

export default connect(
  mapStateToProps,
)(Sidewalks);
