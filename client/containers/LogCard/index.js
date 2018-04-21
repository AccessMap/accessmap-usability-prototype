import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Card, { CardText, CardTitle } from 'react-md/src/js/Cards';
import TextField from 'react-md/src/js/TextFields';

const LogCard = (props) => {
  const {
    log,
  } = props;

  return (
    <Card className='log-card'>
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
