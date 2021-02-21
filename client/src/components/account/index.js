import React from 'react';
import { Fragment } from 'react';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { ToastContainer } from 'react-toastify';

//material ui
import { Container, Grid, makeStyles } from '@material-ui/core';

//styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <ToastContainer />
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Profile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

export default Account;
