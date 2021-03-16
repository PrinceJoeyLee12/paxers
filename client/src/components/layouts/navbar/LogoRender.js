import React from 'react';
import paxers from './paxers.png';
import { withRouter } from 'react-router';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

//Styling
const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    zIndex: '99',
    position: 'absolute',
    left: '50px',
    top: '0px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '10px',
      left: `${process.env.REACT_APP_DRAWER_WIDTH}px`,
      top: '5px',
    },
  },
  logo: {
    display: 'flex',
    height: '40px',
    width: '100px',
  },
}));

const LogoRender = ({ history, isAuthenticated }) => {
  const classes = useStyles();
  return (
    <>
      <Button
        edge='start'
        color='inherit'
        aria-label='open drawer'
        onClick={!isAuthenticated ? () => history.push('/') : null}
        className={classes.buttonContainer}>
        <img src={paxers} alt='Logo' className={classes.logo} />
      </Button>
    </>
  );
};

LogoRender.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(withRouter(LogoRender));
