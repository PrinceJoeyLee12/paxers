import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const BackdropLoading = ({ backdropLoading }) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdropLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

BackdropLoading.propTypes = {
  backdropLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  backdropLoading: state.alert.backdropLoading,
});
export default connect(mapStateToProps, null)(BackdropLoading);
