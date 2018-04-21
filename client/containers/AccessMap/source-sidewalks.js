import React from 'react';

import { Source } from 'react-mapbox-gl';

import sidewalksJSON from 'data/sidewalks.json';

// This has to get set as a constant before render, otherwise all the layers
// using this source have to reload on every render (flickers).
const sidewalkSource = {
  type: 'geojson',
  data: sidewalksJSON,
  maxzoom: 17,
};


const SidewalkSource = () =>
  <Source
    id='sidewalks'
    geoJsonSource={sidewalkSource}
  />;


export default SidewalkSource;
