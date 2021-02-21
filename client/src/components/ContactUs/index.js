import React, { useState, Fragment, useEffect, useRef } from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';

//actions
import { sendConcern } from '../../actions/contactUs';
import {
  getCountryProperties,
  clearSelectedCountryProps,
} from '../../actions/utils';

//utils
import { charReplacer } from '../../utils/textFormater';

//components
import Footer from '../layouts/Footer';
import Country from '../account/Country';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Grid,
  FormHelperText,
  Container,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';

//Custom Styling
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: theme.spacing(-1, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    width: '100%',
  },
  FormControl: {
    width: '100%',
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
  },
}));

//for Number Input
const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        ' ',
        '-',
        ' ',
        /[1-9]/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const ContactUs = ({
  sendConcern,
  getCountryProperties,
  clearSelectedCountryProps,
  dialCode,
}) => {
  //Material UI
  const classes = useStyles();
  const [buttonDisable, setButtonDisable] = useState(false);
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    message: '',
    textChange: 'Submit',
    _country: 'Philippines',

    _flag: '',
    errors: {},
  };
  const [formData, setFormData] = useState(initialState);
  const timer = useRef();
  const {
    firstName,
    lastName,
    email,
    number,
    textChange,
    message,
    _country,
    // eslint-disable-next-line
    _flag,
    errors,
  } = formData;

  const handleChange = prop => event => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const setErrors = errors => {
    setFormData({ ...formData, errors });
    setButtonDisable(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleResponse = (msg, status) => {
    toast[`${status === 200 ? 'success' : 'error'}`](`${msg}`);
    if (status === 200) {
      toast.success(
        `We've already sent your concern to one of our team member please wait for their reply. Thank You!`,
      );
      setFormData({ ...initialState, textChange: 'Submitted' });
      timer.current = window.setTimeout(() => {
        setFormData(initialState);
        clearTimeout(timer.current);
        setButtonDisable(false);
      }, 5000);
    } else {
      setButtonDisable(false);
      setFormData({ ...formData, textChange: 'Submit Again' });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormData({ ...formData, errors: {} });

    if (!buttonDisable) {
      setButtonDisable(true);

      //remove unnecessary characters in number
      let formated_contactNumber = charReplacer(number, ' ', '');
      formated_contactNumber = charReplacer(formated_contactNumber, '-', '');

      setFormData({ ...formData, textChange: 'Submitting...' });
      sendConcern(
        {
          firstName,
          lastName,
          email,
          formated_contactNumber,
          message,
          dialCode,
        },
        handleResponse,
        setErrors,
      );
    }
  };

  //if country changes
  useEffect(() => {
    async function setCountrySelected() {
      clearSelectedCountryProps();
      getCountryProperties(_country);
    }
    setCountrySelected();
  }, [_country, clearSelectedCountryProps, getCountryProperties]);

  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Contact Us
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classnames(classes.form, classes.margin)}
            noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.FormControl}>
                  <TextField
                    fullWidth
                    autoComplete='fname'
                    name='firstName'
                    variant='outlined'
                    required
                    id='firstName'
                    label='First Name'
                    autoFocus
                    value={firstName}
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
                    value={lastName}
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
                    value={email}
                    name='email'
                    autoComplete='email'
                    onChange={handleChange('email')}
                  />
                  <FormHelperText error>{errors.email}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Country
                  _country={_country}
                  setValues={setFormData}
                  values={formData}
                  editable={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.FormControl} variant='outlined'>
                  <OutlinedInput
                    name='number'
                    error={errors.number ? true : false}
                    onChange={handleChange('number')}
                    disabled={dialCode ? false : true}
                    startAdornment={
                      <InputAdornment position='end'>
                        {dialCode ? (
                          `(${dialCode})`
                        ) : (
                          <CircularProgress color='inherit' size={20} />
                        )}
                      </InputAdornment>
                    }
                    aria-describedby='outlined-number-helper-text-contact-us'
                    id='formatted-text-mask-input'
                    inputComponent={TextMaskCustom}
                    labelWidth={0}
                    value={number}
                  />
                  <FormHelperText
                    id='outlined-number-helper-text-contact-us'
                    error>
                    {errors.number}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.FormControl} variant='outlined'>
                  <TextField
                    id='outlined-multiline-static'
                    label='Your Message'
                    multiline
                    rows={5}
                    variant='outlined'
                    name='message'
                    value={message}
                    onChange={handleChange('message')}
                  />
                  <FormHelperText error>{errors.message}</FormHelperText>
                </FormControl>
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
          </form>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    </Fragment>
  );
};

ContactUs.propTypes = {
  sendConcern: PropTypes.func,
  getCountryProperties: PropTypes.func,
  clearSelectedCountryProps: PropTypes.func,
};

const mapStateToProps = state => ({
  dialCode: state.utils.selectedCountry.dialCode,
});

export default connect(mapStateToProps, {
  sendConcern,
  getCountryProperties,
  clearSelectedCountryProps,
})(ContactUs);
