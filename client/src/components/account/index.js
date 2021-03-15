import React, { Suspense, Fragment } from 'react';

import { ToastContainer } from 'react-toastify';

//material ui
import {
  Container,
  Grid,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
//components
const Profile = React.lazy(() => import('./Profile'));
const ProfileDetails = React.lazy(() => import('./ProfileDetails'));

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
      <Suspense
        fallback={
          <div style={{ paddingTop: '50px', textAlign: 'center' }}>
            <CircularProgress />
          </div>
        }>
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
      </Suspense>
    </Fragment>
  );
};

export default Account;
