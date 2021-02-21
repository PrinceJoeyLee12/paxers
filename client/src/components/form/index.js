import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

//actions
import { getForm } from '../../actions/form';
import { getEvent } from '../../actions/event';

//components
import FormFields from './FormFields';

//material UI
import { CircularProgress, Grid, Typography, Paper } from '@material-ui/core';

//Custom Styles
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
theme.typography.h4 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '20px',
    padding: '20px',
  },
  title: {
    textAlign: '-webkit-center',
  },
  subTitle: {
    variant: 'h1',
    textAlign: '-webkit-center',
  },
  controlForm: {
    width: '100%',
  },
}));

const EventForm = ({
  match,
  getForm,
  auth: { isAuthenticated, user },
  form,
  event,
  getEvent,
  location,
}) => {
  const classes = useStyles();

  const [readyToView, setReadyToView] = useState(false);

  useEffect(() => {
    if (Object.keys(form).length !== 0 && form.formFields !== undefined) {
      if (
        Object.keys(event).length !== 0 &&
        event._id.toString() === match.params.id &&
        event.categories !== undefined
      ) {
        setReadyToView(true);
      } else {
        getEvent(match.params.id);
      }
    } else {
      getForm(match.params.id);
    }
  }, [
    getForm,
    form,
    getEvent,
    event,
    event._id,
    form.formFields,
    event.categories,
    match.params.id,
  ]);
  if (user._id === undefined) {
    localStorage.setItem('prevPath', location.pathname);
    return <Redirect to='/login' />;
  }
  if (isAuthenticated) {
    localStorage.removeItem('prevPath');
  }
  return (
    <Fragment>
      <ToastContainer />
      {readyToView ? (
        <>
          <Paper elevation={3} className={classes.paper}>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='h3' className={classes.title}>
                  {event.title}
                </Typography>
                <Typography variant='h4' className={classes.subTitle}>
                  Registration Form
                </Typography>
              </Grid>
            </Grid>
            <FormFields
              form={form}
              distanceTypeIsKM={event.distanceTypeIsKM}
              categories={event.categories}
              distance={match.params.distance}
              eventId={match.params.id}
            />
          </Paper>
        </>
      ) : (
        <div style={{ paddingTop: '50px', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
};

EventForm.propTypes = {
  getForm: PropTypes.func,
  getEvent: PropTypes.func,
  form: PropTypes.object,
  event: PropTypes.object,
};

const mapStateToProps = state => ({
  form: state.form,
  event: state.event.event,
  auth: state.auth,
});

export default connect(mapStateToProps, { getForm, getEvent })(EventForm);
