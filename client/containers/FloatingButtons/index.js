import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import SVGIcon from 'react-md/src/js/SVGIcons';

import minus from 'icons/minus.svg';
import plus from 'icons/plus.svg';


const FloatingButtons = (props) => {
  const {
    actions,
    zoom,
  } = props;

  return (
    <div className='floating-buttons'>
      <Button
        floating
        svg
        mini
        secondary
        swapTheming
        tooltipLabel='Zoom in'
        tooltipPosition='left'
        onClick={() => actions.setZoom(zoom + 1)}
      >
        <SVGIcon use={plus.url} />
      </Button>
      <Button
        floating
        svg
        mini
        secondary
        swapTheming
        tooltipLabel='Zoom out'
        tooltipPosition='left'
        onClick={() => actions.setZoom(zoom - 1)}
      >
        <SVGIcon use={minus.url} />
      </Button>
    </div>
  );
};

FloatingButtons.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  zoom: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  zoom: state.view.zoom,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingButtons);
