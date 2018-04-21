import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

const MapOverlay = (props) => {
  const {
    children,
  } = props;

  return (
    <div className='map-overlay'>
      {children}
    </div>
  );
};

MapOverlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

MapOverlay.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapOverlay);
