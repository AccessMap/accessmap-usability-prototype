import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Card, { CardText } from 'react-md/src/js/Cards';
import SelectionControl from 'react-md/src/js/SelectionControls';
import SVGIcon from 'react-md/src/js/SVGIcons';
import Toolbar from 'react-md/src/js/Toolbars';

import SearchGeocoder from 'containers/Geocoders/SearchGeocoder';

import DownhillMaxSlider from 'containers/Settings/DownhillMaxSlider';
import DownhillMinSlider from 'containers/Settings/DownhillMinSlider';
import UphillMaxSlider from 'containers/Settings/UphillMaxSlider';
import UphillMinSlider from 'containers/Settings/UphillMinSlider';

import magnify from 'icons/magnify.svg';


const OmniCard = (props) => {
  const {
    actions,
    uphillMode,
  } = props;

  const topBar = (
    <Toolbar
      className='geocoder-toolbar'
      title={<SearchGeocoder />}
      nav={
        <SVGIcon
          className={cn('md-btn--toolbar search-icon')}
          use={magnify.url}
        />
      }
    />
  );

  let sliders;
  if (uphillMode) {
    sliders = (
      <React.Fragment>
        <UphillMaxSlider />
        <UphillMinSlider />
      </React.Fragment>
    );
  } else {
    sliders = (
      <React.Fragment>
        <DownhillMaxSlider />
        <DownhillMinSlider />
      </React.Fragment>
    );
  }

  return (
    <Card className='omnicard'>
      {topBar}
      <CardText>
        {sliders}
      </CardText>
      <SelectionControl
        type='switch'
        checked={uphillMode}
        id='uphill-mode'
        label='Uphill mode'
        name='uphill-mode-toggle'
        onChange={actions.toggleUphill}
      />
    </Card>
  );
};

OmniCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  uphillMode: PropTypes.bool.isRequired,
};

OmniCard.defaultProps = {
};

const mapStateToProps = (state) => {
  const {
    map,
  } = state;

  return {
    uphillMode: map.inclineUphill,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OmniCard);
