import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

//components
import DistanceType from './DistanceType';
import ChangePassword from './ChangePassword';

//material ui
import { List, Paper, ListSubheader, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: '20px',
  },
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <ToastContainer />
      <Paper className={classes.paper}>
        <List
          subheader={<ListSubheader>Settings</ListSubheader>}
          className={classes.root}>
          <DistanceType />
          <Divider />
          <ChangePassword />
        </List>
      </Paper>
    </Fragment>
  );
};

export default Settings;
