import React from 'react';
import PropTypes from 'prop-types';

import SVGIcon from 'react-md/src/js/SVGIcons';

import { DecisionTree } from 'machine_learning';
// import DecisionTree from 'decision-tree';
// import { LogisticRegression } from 'js-regression';
// import { LogisticRegressionClassifier } from 'apparatus';

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

  const thresholds = [null, null];

  if (impossibles.length && difficults.length) {
    const X1 = impossibles.map(d => [d]);
    const X2 = difficults.map(d => [d]);
    const X = X1.concat(X2);
    const y1 = impossibles.map(() => 1);
    const y2 = difficults.map(() => 0);
    const y = y1.concat(y2);

    const dt1 = new DecisionTree({
      data: X,
      result: y,
    });

    dt1.build();

    thresholds[1] = Number(dt1.tree.value);
  }

  if (difficults.length && notdifficults.length) {
    const X1 = difficults.map(d => [d]);
    const X2 = notdifficults.map(d => [d]);
    const X = X1.concat(X2);
    const y1 = difficults.map(() => 1);
    const y2 = notdifficults.map(() => 0);
    const y = y1.concat(y2);

    const dt0 = new DecisionTree({
      data: X,
      result: y,
    });

    dt0.build();

    thresholds[0] = Number(dt0.tree.value);
  }

  return (
    <SVGIcon
      viewBox={`0 0 ${w} ${h}`}
      className='answers-graph'
    >
      { thresholds[0] !== null ?
        <line
          x1={xTransform(thresholds[0])}
          y1={answerHeights[1]}
          x2={xTransform(thresholds[0])}
          y2={answerHeights[2]}
          style={{ stroke: 'rgb(0,0,255)', strokeWidth: 2, opacity: 0.5 }}
        />
        : null
      }
      { thresholds[1] !== null ?
        <line
          x1={xTransform(thresholds[1])}
          y1={answerHeights[0]}
          x2={xTransform(thresholds[1])}
          y2={answerHeights[1]}
          style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2, opacity: 0.5 }}
        />
        : null
      }
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
