import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { forgotPassword } from '../../actions/auth';

//Footer
import Footer from '../layouts/Footer';

//Material UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  FormHelperText,
  Container,
  Typography,
  FormControl,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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
    marginTop: theme.spacing(1),
  },
  Typography: {
    marginBottom: theme.spacing(2),
    color: 'red',
  },
}));
const ForgetPassword = ({ history, forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Send Me A Link',
    error: {},
  });

  const classes = useStyles();

  const { email, textChange, error } = formData;

  const handleChange = props => event => {
    setFormData({ ...formData, [props]: event.target.value });
  };

  const textChangeAfterSubmit = textChange => {
    setFormData({ ...formData, textChange });
  };

  const setError = error => {
    setFormData({ ...formData, error });
  };

  const handleSubmit = e => {
    e.preventDefault();
    forgotPassword(textChangeAfterSubmit, setError, email);
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
            Forgot Password
          </Typography>
          <Typography component='p' variant='h6'>
            Change your password in three easy steps. This will help you to
            secure your password!
          </Typography>
          <List>
            <ListItem>
              <Typography component='p'>1. Email address below.</Typography>
            </ListItem>
            <ListItem>
              <Typography component='p'>
                2. Will send you a temporary link.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component='p'>
                3. Use the link to reset your password
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <FormControl fullWidth>
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
              <FormHelperText error>{error.email}</FormHelperText>
              <FormHelperText>
                Enter the email address you used during the registration on
                {` ${process.env.REACT_APP_BRAND_NAME}`}. Then we'll email a
                link to this address.
              </FormHelperText>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              {textChange}
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    </Fragment>
  );
};

ForgetPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, { forgotPassword })(ForgetPassword);
