import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import { GoogleLogin } from 'react-google-login';

import { register, googleSignIn } from '../../actions/auth';
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

//icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { UserPlus as UserPlusIcon } from 'react-feather';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  FormControl: {
    width: '100%',
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
  },
}));

const Register = ({ isAuthenticated, register, googleSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    textChange: 'Submit',
    errors: {},
    showPassword: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    textChange,
    errors,
    showPassword,
  } = formData;

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

  const setErrors = errors => {
    setFormData({ ...formData, errors });
  };

  const googleResponse = response => {
    const { email, familyName, givenName, imageUrl } = response.profileObj;
    googleSignIn({ familyName, givenName, email, imageUrl }, setErrors);
  };

  const handleSubmit = e => {
    e.preventDefault();
    register(
      { firstName, lastName, email, password, password2 },
      textChangeAfterSubmit,
      setErrors,
    );
  };

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
            <UserPlusIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classnames(classes.form, classes.margin)}
            noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.FormControl}>
                  <TextField
                    autoComplete='fname'
                    name='firstName'
                    variant='outlined'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    onChange={handleChange('firstName')}
                  />
                  <FormHelperText error>{errors.firstName}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.FormControl}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='lastName'
                    onChange={handleChange('lastName')}
                  />
                  <FormHelperText error>{errors.lastName}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.FormControl}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={handleChange('email')}
                  />
                  <FormHelperText error>{errors.email}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant='outlined'
                  fullWidth
                  className={classes.FormControl}>
                  <InputLabel htmlFor='outlined-adornment-password' required>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    autoComplete='current-password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
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
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant='outlined'
                  fullWidth
                  className={classes.FormControl}>
                  <InputLabel htmlFor='outlined-adornment-password2' required>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password2'
                    autoComplete='current-password'
                    type='password'
                    value={password2}
                    onChange={handleChange('password2')}
                    labelWidth={145}
                  />
                  <FormHelperText error>{errors.password2}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              {textChange}
            </Button>
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={googleResponse}
              onFailure={googleResponse}
              className={classes.googleButton}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={classes.googleButton}>
                  <i
                    className='fab fa-google'
                    style={{ paddingRight: '10px' }}
                  />
                  <Typography>Sign Up with Google</Typography>
                </Button>
              )}
            /> */}
          </form>
          <a
            href={`${window.location.origin}/api/auth/google`}
            style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              className={classes.googleButton}
              // onClick={handleGoogleSignIn}
            >
              <i className='fab fa-google' style={{ paddingRight: '10px' }} />
              Login with Google
            </Button>
          </a>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                {'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func,
  googleSignIn: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, googleSignIn })(Register);
