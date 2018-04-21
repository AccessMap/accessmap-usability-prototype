import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import Card, { CardActions, CardText } from 'react-md/src/js/Cards';
import DataTable, { TableBody, TableRow, TableColumn } from 'react-md/src/js/DataTables';
import Divider from 'react-md/src/js/Dividers';
import SelectionControl from 'react-md/src/js/SelectionControls';
import SVGIcon from 'react-md/src/js/SVGIcons';
import Toolbar from 'react-md/src/js/Toolbars';

import SearchGeocoder from 'containers/Geocoders/SearchGeocoder';

import DownhillMaxSlider from 'containers/Settings/DownhillMaxSlider';
import DownhillMinSlider from 'containers/Settings/DownhillMinSlider';
import UphillMaxSlider from 'containers/Settings/UphillMaxSlider';
import UphillMinSlider from 'containers/Settings/UphillMinSlider';

import magnify from 'icons/magnify.svg';

const SURFACE_MAP = {
  asphalt: 'Asphalt',
  concrete: 'Concrete',
  gravel: 'Gravel',
  paving_stone: 'Paving stones',
};

const ContentRow = props => (
  <TableRow>
    <TableColumn>{props.label}</TableColumn>
    <TableColumn>
      {props.content}
    </TableColumn>
  </TableRow>
);

ContentRow.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

const OmniCard = (props) => {
  const {
    actions,
    selectedFeature,
    uphillMode,
  } = props;

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

  let featureContent = null;
  if (selectedFeature) {
    const {
      description,
      incline,
      surface,
    } = selectedFeature.properties;

    featureContent = (
      <React.Fragment>
        <Divider />
        <Toolbar
          title='Selected Sidewalk'
          actions={
            <Button
              icon
              onClick={actions.clearSelectedFeatures}
            >
              close
            </Button>
          }
        />
        <DataTable plain>
          <TableBody>
            {
              description !== undefined
              ?
                <ContentRow label='Description' content={description} />
              :
                null
            }
            {incline !== undefined
             ?
               <ContentRow
                 label='Incline'
                 content={`${Math.abs((incline * 100).toFixed(1))}%`}
               />
             :
               null
            }
            {surface !== undefined ?
              <ContentRow label='Surface' content={SURFACE_MAP[surface]} /> :
              null
            }
          </TableBody>
        </DataTable>
        <CardActions>
          <Button
            raised
            secondary
            onClick={() => actions.rateSidewalk('IMPOSSIBLE', selectedFeature)}
          >
            Impossible
          </Button>
          <Button
            raised
            primary
            onClick={() => actions.rateSidewalk('POSSIBLE', selectedFeature)}
          >
            Possible
          </Button>
        </CardActions>
        <CardActions>
          <Button
            flat
            secondary
            onClick={() => actions.rateSidewalk('DIFFICULT', selectedFeature)}
          >
            Difficult
          </Button>
          <Button
            flat
            primary
            onClick={() => actions.rateSidewalk('NOT DIFFICULT', selectedFeature)}
          >
            Not difficult
          </Button>
        </CardActions>
        <CardActions>
          <Button
            flat
            onClick={actions.undoRateSidewalk}
            style={{ color: 'red' }}
          >
            Undo
          </Button>
        </CardActions>
      </React.Fragment>
    );
  }

  return (
    <Card className='omnicard'>
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
      <SelectionControl
        type='switch'
        checked={uphillMode}
        id='uphill-mode'
        label='Uphill mode'
        name='uphill-mode-toggle'
        onChange={actions.toggleUphill}
      />
      <CardText>
        {sliders}
      </CardText>
      {featureContent}
    </Card>
  );
};

OmniCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
    properties: PropTypes.object,
  }),
  uphillMode: PropTypes.bool.isRequired,
};

OmniCard.defaultProps = {
  selectedFeature: null,
};

const mapStateToProps = (state) => {
  const {
    map,
  } = state;

  return {
    selectedFeature: map.selectedFeature,
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
