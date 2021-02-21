import React, { useState, Fragment, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

//actions
import { sendTemporaryPassword } from '../../actions/user';

//Components
import Footer from '../layouts/Footer';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, TextField } from '@material-ui/core';
//Custom Styling
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.8)', // (default alpha is 0.38)
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ChangePassword = ({ user: { email, _id }, sendTemporaryPassword }) => {
  const timer = useRef();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [buttonText, setButtonText] = useState('Send me a temporary password');

  //Material UI
  const classes = useStyles();

  //handle submit for sending email
  const handleSubmit = e => {
    e.preventDefault();
    if (!buttonDisable) {
      clearTimeout(timer.current);
      setButtonText('Sending...');
      setButtonDisable(true);
      sendTemporaryPassword(email, _id, handleResponse);
    }
  };

  //trigger this function after the response of email sending
  const handleResponse = (msg, status) => {
    toast[`${status === 200 ? 'success' : 'error'}`](`${msg}`);
    if (status === 200) {
      setButtonText('Resend in (30sec...)');
      timer.current = window.setTimeout(() => {
        clearTimeout(timer.current);
        setButtonText('Send me a temporary password');
        setButtonDisable(false);
      }, 30000);
    } else setButtonText('Send me a temporary password');
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={classes.root} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Email Address'
          value={email}
          autoFocus
          disabled
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='secondary'
          className={classes.submit}>
          {`${buttonText}`}
        </Button>
      </form>
      <Box mt={8}>
        <Footer />
      </Box>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  sendTemporaryPassword: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  sendTemporaryPassword,
})(withRouter(ChangePassword));
