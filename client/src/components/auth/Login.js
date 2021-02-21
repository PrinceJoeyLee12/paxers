import React, { useState, Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GoogleLogin } from 'react-google-login';

import { login, google } from '../../actions/auth';
import { setDialog } from '../../actions/alert';

import { ToastContainer } from 'react-toastify';

//footer
import Footer from '../layouts/Footer';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  FormHelperText,
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Custom Styling

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  googleButton: {
    margin: theme.spacing(-1, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    width: '100%',
  },
}));

const Login = ({ auth: { isAuthenticated }, login, google, setDialog }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    textChange: 'Submit',
    showPassword: false,
  });

  const { email, password, textChange, showPassword } = formData;

  //Material UI
  const classes = useStyles();

  const handleChange = prop => event => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const textChangeAfterSubmit = textChange => {
    setFormData({ ...formData, textChange });
  };

  const handleErrors = errorsFromBack => {
    setErrors(errorsFromBack);
  };

  const googleResponse = response => {
    if (response.profileObj !== undefined) {
      const { email, familyName, givenName, imageUrl } = response.profileObj;
      google({ familyName, givenName, email, imageUrl }, handleErrors);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password }, textChangeAfterSubmit, handleErrors);
  };

  useEffect(() => {
    if (
      localStorage.getItem(`prevPath`) !== undefined &&
      localStorage.getItem(`prevPath`) !== ''
    ) {
      // eslint-disable-next-line
      setDialog(
        'You are not login',
        "Please Login first. If you don't have an account yet you can register with link provided in the form below",
        'Close',
        '',
        '',
      );
    }
  }, [setDialog]);

  if (isAuthenticated) {
    localStorage.removeItem('prevPath');
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <FormControl className={classes.margin} fullWidth>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={handleChange('email')}
              />
              <FormHelperText error>{errors.email}</FormHelperText>
            </FormControl>
            <FormControl
              className={classes.margin}
              variant='outlined'
              fullWidth>
              <InputLabel htmlFor='outlined-adornment-password' required>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete='current-password'
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={80}
              />
              <FormHelperText error>{errors.password}</FormHelperText>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              {textChange}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={googleResponse}
              onFailure={googleResponse}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={classes.googleButton}>
                  <i className='fab fa-google' />
                  <Typography>Google Sign In</Typography>
                </Button>
              )}
            />
            <Grid container>
              <Grid item xs>
                <Link href='/forgot-password' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func,
  google: PropTypes.func,
  setDialog: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  google,
  setDialog,
})(Login);