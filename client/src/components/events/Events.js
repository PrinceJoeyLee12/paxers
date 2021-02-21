import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from './Search';
import { ToastContainer } from 'react-toastify';
import { getEvents, setLoading, setShowEvent } from '../../actions/event';
import EventInitialView from './initialEventView';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Events = ({
  isAuthenticated,
  getEvents,
  event: { events, showEvent },
  setShowEvent,
  setLoading,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (events.length !== 0) {
      setShowEvent(false);
      setLoading(false);
    } else {
      getEvents();
    }
  }, [getEvents, setShowEvent, setLoading, events.length]);

  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Fragment>
      <ToastContainer />
      <div className={classes.content}>
        <Grid container spacing={3} justify='center' alignItems='flex-start'>
          <Grid item xs={12} style={{ textAlign: '-webkit-center' }}>
            <Search />
          </Grid>
          {showEvent
            ? ''
            : events.map((event, index) => (
                <EventInitialView key={index} event={event} />
              ))}
        </Grid>
      </div>
    </Fragment>
  );
};

Events.propTypes = {
  isAuthenticated: PropTypes.bool,
  event: PropTypes.object.isRequired,
  getEvents: PropTypes.func,
  setLoading: PropTypes.func,
  setShowEvent: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  event: state.event,
});

export default connect(mapStateToProps, {
  getEvents,
  setLoading,
  setShowEvent,
})(Events);
