import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';

const SearchGeocoder = (props) => {
  const {
    actions,
    center,
  } = props;

  return (
    <GeocoderAutocomplete
      id='search-geocoder'
      key='search-geocoder'
      className='search-geocoder md-title--toolbar'
      listClassName='toolbar-search__list'
      block
      placeholder='Search address'
      onAutocomplete={(label, index, data) => {
        const poi = data[index];
        actions.setPOI(poi.location[0], poi.location[1], poi.name);
      }}
      proximity={center}
    />
  );
};

SearchGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
};

SearchGeocoder.defaultProps = {
};

const mapStateToProps = (state) => {
  const {
    view,
  } = state;

  return {
    center: [view.lng, view.lat],
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchGeocoder);
