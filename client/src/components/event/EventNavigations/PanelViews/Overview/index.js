import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

//Components
import CategoriesPanel from '../CategoriesPanel';
import RaceKits from '../RaceKits';
import Prizes from '../Prizes';
import ContactInfo from '../ContactInfo';
import PaymentOptions from '../PaymentOptions';
import Medals from '../Medals';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  component: {
    paddingTop: '20px',
  },
}));

const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const Overview = ({ event: { event } }) => {
  const {
    eventLocation,
    startDate,
    registrationStart,
    registrationEnd,
    categories,
    endDate,
  } = event;
  const classes = useStyles();

  const [readyToView, setReadyToView] = useState(false);

  useEffect(() => {
    if (categories !== undefined) {
      setReadyToView(true);
    }
  }, [categories, setReadyToView]);

  return (
    <Fragment>
      {readyToView ? (
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant='h6'
              color='primary'
              style={{ marginTop: '10px' }}>
              Date of Event:
              <Typography style={{ marginLeft: '50px', color: '#000' }}>
                {startDate && endDate ? (
                  <>
                    <Moment format='MMM DD, YYYY'>{startDate}</Moment>
                    <span>{' - '}</span>
                    <Moment format='MMM DD, YYYY'>{endDate}</Moment>
                  </>
                ) : (
                  <Moment format='MMMM DD, YYYY ' date={startDate} />
                )}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant='h6'
              color='primary'
              style={{ marginTop: '10px' }}>
              Event Location:{' '}
              <Typography style={{ marginLeft: '50px', color: '#000' }}>
                {eventLocation}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant='subtitle1'
              color='primary'
              style={{ marginTop: '10px' }}>
              Registration Start:
              <Typography style={{ marginLeft: '50px', color: '#000' }}>
                <Moment format='MMMM DD, YYYY ' date={registrationStart} />
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant='subtitle1'
              color='primary'
              style={{ marginTop: '10px' }}>
              Registration End:
              <Typography style={{ marginLeft: '50px', color: '#000' }}>
                <Moment format='MMMM DD, YYYY ' date={registrationEnd} />
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.component}>
            <CategoriesPanel />
          </Grid>
          <Grid item xs={12} className={classes.component}>
            <Medals />
          </Grid>
          <Grid item xs={12} className={classes.component}>
            <RaceKits />
          </Grid>
          <Grid item xs={12} className={classes.component}>
            <Prizes />
          </Grid>
          <Grid item xs={12} className={classes.component}>
            <ContactInfo />
          </Grid>
          <Grid item xs={12} className={classes.component}>
            <PaymentOptions />
          </Grid>
        </Grid>
      ) : (
        <RenderFallbackOption>
          <CircularProgress />
        </RenderFallbackOption>
      )}
    </Fragment>
  );
};
Overview.propTypes = {
  event: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  event: state.event,
});

export default connect(mapStateToProps, null)(Overview);
