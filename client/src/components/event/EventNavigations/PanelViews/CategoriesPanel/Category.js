import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// utils
import { checkRegistrationStatus } from '../../../../../utils/checkRegistrationStatus';
import { distanceTypeIsNumber } from '../../../../../utils/numberFormater';

//Material Ui
import { Typography, Grid, Button } from '@material-ui/core';

//Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  label: {
    variant: 'body1',
    color: 'primary',
  },
  data: {
    color: 'rgb(255,0,0,1)',
  },
  button: {
    width: '80%',
    variant: 'outlined',
    backgroundColor: 'rbg(255,0,0,.89)',
  },
}));

const Category = ({
  category,
  distanceTypeIsKM,
  match,
  history,
  auth: { user },
  location,
  registrationEnd,
}) => {
  const {
    registrationAmount,
    distance,
    slotQuota,
    assemblyTime,
    gunTime,
    cutOffTime,
    totalRegistrants,
  } = category;

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Typography className={classes.label}>
                Registration Fee:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.data}>
                {`₱  ${
                  registrationAmount === undefined ||
                  registrationAmount === null
                    ? '---'
                    : registrationAmount === 0
                    ? 'Free'
                    : registrationAmount
                } `}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* -------------------------------------------------------------- */}
        <Grid item xs={12} sm={4} md={3}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Typography className={classes.label}>
                Total Registrants:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.data}>
                {totalRegistrants}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* -------------------------------------------------------------- */}
        <Grid item xs={12} sm={4} md={3}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Typography className={classes.label}>
                Slot(s) Remaining:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.data}>
                {slotQuota - totalRegistrants > 0
                  ? slotQuota - totalRegistrants
                  : '0'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* -------------------------------------------------------------- */}
        <Grid item xs={12} sm={4} md={3}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Typography className={classes.label}>Assembly Time:</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.data}>{assemblyTime}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* -------------------------------------------------------------- */}
        <Grid item xs={12} sm={4} md={3}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Typography className={classes.label}>Gun Time:</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.data}>{gunTime}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* -------------------------------------------------------------- */}
        <Grid item xs={12} sm={4} md={3}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Typography className={classes.label}>Cut Off Time:</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.data}>{cutOffTime}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            wrap='nowrap'
            direction='row'
            justify='center'
            alignItems='center'>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                className={classes.button}
                color='secondary'
                disabled={
                  slotQuota - totalRegistrants > 0 &&
                  checkRegistrationStatus(registrationEnd)
                    ? false
                    : true
                }
                onClick={() => {
                  localStorage.setItem('prevPath', location.pathname);
                  user._id === undefined
                    ? history.push('/login')
                    : history.push(
                        `/form/${match.params.title}/${match.params.id}/${distance}`,
                      );
                }}
                disableElevation>
                <Typography variant='subtitle1'>
                  Register{' for '}
                  {`   ${distance}${
                    distanceTypeIsNumber(distance)
                      ? distanceTypeIsKM
                        ? 'KM'
                        : 'miles'
                      : ''
                  }`}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(Category));
