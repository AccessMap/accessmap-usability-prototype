import React from 'react';
import PropTypes from 'prop-types';

import SVGIcon from 'react-md/src/js/SVGIcons';

const AnswersGraph = (props) => {
  const {
    impossibles,
    difficults,
    notdifficults,
    fontSize,
  } = props;

  const w = 200;
  const h = 100;
  const margin = 10;

  const answerHeights = [10, 40, 70];

  // Create transform from x-axis inclines to SVG plottable region (w - 2*margin)
  const inclineMin = 0;
  const inclineMax = 0.15;
  const inclineRange = inclineMax - inclineMin;

  const svgMin = margin;
  const svgMax = w - (2 * margin);
  const svgRange = svgMax - svgMin;

  const xTransform = incline => (((incline - inclineMin) / inclineRange) * svgRange) + svgMin;

  const circleFactory = (incline, key, height) => (
    <circle
      key={key}
      cx={xTransform(incline)}
      cy={height}
      r='2'
    />
  );

  return (
    <SVGIcon
      viewBox={`0 0 ${w} ${h}`}
      className='answers-graph'
    >
      {
        [impossibles, difficults, notdifficults].map((data, i) => (
          <g key={data + answerHeights[i]}>
            { data.map((inc, j) => circleFactory(inc, inc + j, answerHeights[i])) }
          </g>
        ))
      }
      <text
        x={margin}
        y={answerHeights[2]}
        fontSize={fontSize}
        textAnchor='middle'
      >
        {'ND'}
      </text>
      <text
        x={margin}
        y={answerHeights[1]}
        fontSize={fontSize}
        textAnchor='middle'
      >
        {'D'}
      </text>
      <text
        x={margin}
        y={answerHeights[0]}
        fontSize={fontSize}
        textAnchor='middle'
      >
        {'I'}
      </text>
      <text
        x={Math.floor((w - (margin * 2)) / 2)}
        y={h - margin}
        fontSize={fontSize}
        textAnchor='middle'
      >
        {'Incline (%)'}
      </text>
    </SVGIcon>
  );
};

AnswersGraph.propTypes = {
  impossibles: PropTypes.arrayOf(PropTypes.number),
  difficults: PropTypes.arrayOf(PropTypes.number),
  notdifficults: PropTypes.arrayOf(PropTypes.number),
  fontSize: PropTypes.number,
};

AnswersGraph.defaultProps = {
  impossibles: [],
  difficults: [],
  notdifficults: [],
  fontSize: 10,
};

export default AnswersGraph;
