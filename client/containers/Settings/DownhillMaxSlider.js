import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Slider from 'react-md/src/js/Sliders';

const DownhillMaxSlider = (props) => {
  const {
    actions,
    inclineDownhillMax,
    inclineDownhillMin,
  } = props;

  const percent = +(inclineDownhillMax / 10).toFixed(1);

  return (
    <Slider
      discrete
      id='downhill-max-slider'
      label={`Maximum downhill incline ${percent}%`}
      defaultValue={percent}
      min={inclineDownhillMin / 10}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setDownhillMax(d * 10)}
      value={percent}
    />
  );
};

DownhillMaxSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  inclineDownhillMax: PropTypes.number.isRequired,
  inclineDownhillMin: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const {
    inclineRanges,
  } = state;

  return {
    inclineDownhillMax: inclineRanges.inclineDownhillMax,
    inclineDownhillMin: inclineRanges.inclineDownhillMin,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownhillMaxSlider);
