import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { resetPassword } from '../../actions/auth';

//footer
import Footer from '../layouts/Footer';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  Button,
  CssBaseline,
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
  Avatar,
  List,
  ListItem,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  Typography: {
    marginBottom: theme.spacing(2),
    color: 'red',
  },
}));

const ResetPassword = ({ history, resetPassword, match }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
    token: match.params.token,
    textChange: 'Submit',
    errors: {},
    showPassword: false,
  });

  const {
    token,
    showPassword,
    password,
    password2,
    textChange,
    errors,
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

  const handleSubmit = e => {
    e.preventDefault();
    resetPassword(
      { password2, password, token },
      textChangeAfterSubmit,
      setErrors,
      history,
    );
  };
  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography
            component='h6'
            variant='h6'
            className={classes.Typography}>
            Reset Password
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
          </List>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
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
                    id='outlined-adornment-password2'
                    type='password'
                    value={password2}
                    onChange={handleChange('password2')}
                    labelWidth={190}
                  />
                  <FormHelperText error>{errors.password2}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me.'
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
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  {'Bak to Login'}
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

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
