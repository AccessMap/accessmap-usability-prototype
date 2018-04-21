import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactMapboxGl from 'react-mapbox-gl';

import * as AppActions from 'actions';

import SidewalkSource from './source-sidewalks';

import Sidewalks from './layers-sidewalks';


const CLICKABLE_LAYERS = [
  'sidewalk-click',
];

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN,
  minZoom: 10,
  maxZoom: 20,
  bearing: [0],
  pitch: [0],
});

class AccessMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: [15],
      width: 0,
      height: 0,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const width = this.mapEl.container.clientWidth;
    const height = this.mapEl.container.clientHeight;
    if (this.state.width !== width || this.state.height !== height) {
      this.setState({
        width,
        height,
      });
    }
  }

  render() {
    const {
      actions,
      center,
      zoom,
      ...props
    } = this.props;

    // NOTE: Do not create actions that modify the `view` substate via
    // onMoveEnd or onZoomEnd. If you do, it creates an infinite loop.
    return (
      <Map
        className='accessmap'
        ref={(el) => { this.mapEl = el; }}
        center={center}
        zoom={[zoom]}
        bearing={[0]}
        pitch={[0]}
        maxBounds={[
          [
            -122.71446096536938,
            47.40689742599213,
          ],
          [
            -121.9073424946721,
            47.8092130645955,
          ],
        ]}
        /* eslint-disable react/style-prop-object */
        style='mapbox://styles/accessmap/cjdl9ee8d03es2rqod4413t1w'
        /* eslint-enable react/style-prop-object */
        onMoveEnd={(m, e) => {
          const newBounds = m.getBounds().toArray();
          const bbox = [
            newBounds[0][0],
            newBounds[0][1],
            newBounds[1][0],
            newBounds[1][1],
          ];

          if (e.originalEvent) {
            const { lng, lat } = m.getCenter();
            actions.mapMove([lng, lat], m.getZoom(), bbox);
          }
        }}
        onMouseMove={(m, e) => {
          const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
          const features = m.queryRenderedFeatures(e.point, {
            layers,
          });
          m.getCanvas().style.cursor = features.length ? 'pointer' : 'default';
        }}
        onDrag={(m) => { m.getCanvas().style.cursor = 'grabbing'; }}
        onClick={(m, e) => {
          const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
          const features = m.queryRenderedFeatures(e.point, {
            layers,
          });
          const point = [e.lngLat.lng, e.lngLat.lat];
          actions.mapClick(features, point);
        }}
        {...props}
      >

        <SidewalkSource />

        <Sidewalks />
      </Map>
    );
  }
}

AccessMap.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
};

AccessMap.defaultProps = {
  center: [-122.333592, 47.605628],
  zoom: 15,
};

const mapStateToProps = state => ({
  center: [state.view.lng, state.view.lat],
  zoom: state.view.zoom,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessMap);
