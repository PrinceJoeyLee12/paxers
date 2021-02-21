import React, { useState, Fragment, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

//actions
import { changePassword } from '../../actions/user';

//Components
import SendTemporaryPassword from './SendTemporaryPassword';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CssBaseline,
  Grid,
  FormHelperText,
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  List,
  ListItem,
} from '@material-ui/core';

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
  List: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  marginRightAuto: {
    marginRight: 'auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  FormControl: {
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
      paddingLeft: theme.spacing(1),
    },
  },
  Typography: {
    marginBottom: theme.spacing(2),
    color: 'red',
  },
}));

const ChangePassword = ({ user: { _id }, changePassword }) => {
  const [buttonDisable, setButtonDisable] = useState(false);

  const initialData = {
    oldPassword: '',
    password: '',
    password2: '',
    buttonText: 'Submit',
    errors: {},
    showPassword: false,
  };
  const [formData, setFormData] = useState(initialData);

  const {
    showPassword,
    oldPassword,
    password,
    password2,
    buttonText,
    errors,
  } = formData;

  //Material UI
  const classes = useStyles();
  const timer = useRef();

  const handleChange = prop => event => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const setErrors = errors => {
    setFormData({ ...formData, errors });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonText = status => {
    if (status === 200) {
      toast.success('You successfully change your password');
      setFormData({ ...initialData, buttonText: 'Submitted' });
      timer.current = window.setTimeout(() => {
        setButtonDisable(false);
        setFormData(initialData);
        clearTimeout(timer.current);
      }, 5000);
    } else {
      setButtonDisable(false);
      if (status !== 400) {
        toast.error(
          "We're having trouble saving your new password. Please try again!",
        );
        setFormData({ ...formData, buttonText: 'Submit Again', errors: {} });
      }
    }
  };

  //handle submit for changing password
  const handleSubmit = e => {
    e.preventDefault();
    if (!buttonDisable) {
      setButtonDisable(true);
      clearTimeout(timer.current);
      setFormData({ ...formData, buttonText: 'Sending...', errors: {} });
      changePassword(
        { oldPassword, password, password2 },
        _id,
        handleButtonText,
        setErrors,
      );
    }
  };

  return (
    <Fragment>
      <ListItem>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography
              component='h6'
              variant='h6'
              className={classes.Typography}>
              Change Your Password
            </Typography>
            <Typography
              component='p'
              variant='h6'
              className={classes.marginRightAuto}>
              Follow the password Format
            </Typography>
            <List className={classes.marginRightAuto}>
              <ListItem className={classes.List}>
                <Typography component='p'>
                  1. Must be at least 6 characters.
                </Typography>
              </ListItem>
              <ListItem className={classes.List}>
                <Typography component='p'>
                  2. Must have Number(s) and Letter(s).
                </Typography>
              </ListItem>
              <ListItem className={classes.List}>
                <Typography component='p'>3. Must not have spaces</Typography>
              </ListItem>
              <Typography
                component='p'
                color='secondary'
                variant='subtitle1'
                style={{ paddingTop: '10px' }}>
                NOTE: If you login using your google account or you forgot your
                password please click "Send me a temporary password" and use it
                as your "Old Password"
              </Typography>
            </List>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    variant='outlined'
                    fullWidth
                    className={classes.FormControl}>
                    <InputLabel htmlFor='outlined-adornment-password' required>
                      Old Password
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-old-password'
                      type='text'
                      autoComplete='current-password'
                      error={errors.oldPassword === undefined ? false : true}
                      autoFocus={errors.oldPassword ? true : false}
                      value={oldPassword}
                      onChange={handleChange('oldPassword')}
                      labelWidth={125}
                    />
                    <FormHelperText error>{errors.oldPassword}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant='outlined'
                    fullWidth
                    className={classes.FormControl}>
                    <InputLabel htmlFor='outlined-adornment-password' required>
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      error={errors.password ? true : false}
                      autoFocus={errors.password ? true : false}
                      autoComplete='current-password'
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
                      labelWidth={125}
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
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      error={errors.password2 ? true : false}
                      autoFocus={errors.password2 ? true : false}
                      autoComplete='current-password'
                      id='outlined-adornment-password2'
                      type='password'
                      value={password2}
                      onChange={handleChange('password2')}
                      labelWidth={190}
                    />
                    <FormHelperText error>{errors.password2}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                {buttonText}
              </Button>
            </form>
            <SendTemporaryPassword />
          </div>
        </Container>
      </ListItem>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  changePassword,
})(withRouter(ChangePassword));
