import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Card, { CardText, CardTitle } from 'react-md/src/js/Cards';
import TextField from 'react-md/src/js/TextFields';

import AnswersGraph from 'components/AnswersGraph';

const LogCard = (props) => {
  const {
    log,
  } = props;

  // Extract the incline values from the log for plotting
  const impossibles = [];
  const difficults = [];
  const notdifficults = [];
  log.forEach((entry) => {
    const incline = entry.payload.feature.properties.incline;
    let target;
    switch (entry.payload.rating) {
      case 'IMPOSSIBLE':
        target = impossibles;
        break;
      case 'DIFFICULT':
        target = difficults;
        break;
      case 'NOT DIFFICULT':
        target = notdifficults;
        break;
      default:
        target = impossibles;
    }
    target.push(Math.abs(incline));
  });

  return (
    <Card className='log-card'>
      <CardText>
        <AnswersGraph
          impossibles={impossibles}
          difficults={difficults}
          notdifficults={notdifficults}
        />
      </CardText>
      <CardTitle expander title='Log' />
      <CardText expandable>
        <TextField
          id='log-card-text'
          block
          disabled
          rows={9}
          maxRows={9}
          value={log.length ? JSON.stringify(log) : ''}
          onChange={() => null}
        />
      </CardText>
    </Card>
  );
};

LogCard.propTypes = {
  log: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  log: state.log,
});

export default connect(
  mapStateToProps,
)(LogCard);
