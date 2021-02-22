import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import moment from 'moment';
import MaskedInput from 'react-text-mask';

//actions
import {
  getCountryProperties,
  clearSelectedCountryProps,
} from '../../actions/utils';
import { charReplacer } from '../../utils/textFormater';
import { updateUserProfileDetails } from '../../actions/user';
import { setBackdropLoading } from '../../actions/alert';

//Components
import Country from './Country';
import City from './City';

//material ui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  IconButton,
  Tooltip,
  FormControl,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.8)', // (default alpha is 0.38)
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  display: {
    display: 'none',
  },
  formControl: {
    minWidth: 120,
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

const ProfileDetails = ({
  className,
  selectedCountry: { countryName, dialCode, currency, flag },
  user: {
    _id,
    firstName,
    lastName,
    email,
    birthDate,
    mySports,
    contactNumber,
    eventsLiked,
    gender,
    myLocation: { country, city, barangay },
  },
  updateUserProfileDetails,
  getCountryProperties,
  setBackdropLoading,
  clearSelectedCountryProps,
  ...rest
}) => {
  const classes = useStyles();
  const [editable, setEditable] = useState(false);
  const initialValues = {
    _firstName: firstName,
    _lastName: lastName,
    _email: email,
    _birthDate: birthDate ? birthDate : moment().format('MMM DD, YYYY'),
    _mySports: mySports.length > 0 ? mySports.join() : '',
    _contactNumber: contactNumber ? contactNumber.slice(-10) : '',
    age: !birthDate ? '0' : moment().diff(birthDate, 'years'),
    _country: country,
    _city: city,
    _barangay: barangay,
    _flag: flag,
    _currency: currency,
    _dialCode: dialCode,
    _gender: gender,
    errors: {},
  };
  const [values, setValues] = useState(initialValues);
  //deconstruct

  const handleDateChange = date => {
    if (date !== 'Invalid Date') {
      //auto Compute age
      setValues({
        ...values,
        _birthDate: date,
      });
    }
  };

  //use effect for age
  useEffect(() => {
    if (values._birthDate)
      setValues({
        ...values,
        age: moment().diff(moment(values._birthDate), 'years'),
      });
    // eslint-disable-next-line
  }, [values._birthDate]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  //listen to changes for user
  useEffect(() => {
    if (dialCode) {
      setValues({
        ...values,
        _flag: flag,
        _currency: currency,
        _dialCode: dialCode,
      });
    }
    // eslint-disable-next-line
  }, [dialCode]);

  useEffect(() => {
    if (
      !values._country ||
      values._country.trim().toLowerCase() !==
        countryName.trim().toLowerCase() ||
      !dialCode
    ) {
      async function fetchCities() {
        clearSelectedCountryProps();
        getCountryProperties(values._country);
      }
      fetchCities();
    }
    // eslint-disable-next-line
  }, [values._country]);

  //handle response after saving
  const handleResponse = (msg, status) => {
    setBackdropLoading(false);
    if (msg && status) {
      if (typeof msg === 'object' && status === 403) {
        setValues({
          ...values,
          errors: msg,
        });
      } else toast[`${parseInt(status) === 200 ? 'success' : 'error'}`](msg);
    }
    if (status === 200) setEditable(false);
  };
  const handleSubmit = () => {
    setValues({ ...values, errors: {} });
    let formated_contactNumber = charReplacer(values._contactNumber, ' ', '');
    formated_contactNumber = charReplacer(formated_contactNumber, '-', '');
    const toUpdateData = {
      firstName: values._firstName,
      lastName: values._lastName,
      gender: values._gender,
      email: values._email,
      birthDate: values._birthDate,
      contactNumber: formated_contactNumber,
      myLocation: {
        barangay: values._barangay,
        country: values._country,
        city: values._city,
      },
      mySports: values._mySports,
      eventsLiked,
      dialCode,
    };

    setBackdropLoading(true);
    updateUserProfileDetails(toUpdateData, _id, handleResponse);
  };

  return (
    <form
      autoComplete='off'
      noValidate
      className={classnames(classes.root, className)}
      {...rest}>
      <Card>
        <CardHeader
          subheader='The information can be edited'
          title='Profile'
          action={
            <Tooltip title='Edit Profile' aria-label='edit-profile'>
              <IconButton
                aria-label='settings'
                color='secondary'
                onClick={() => setEditable(!editable)}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  helperText={values.errors.firstName}
                  FormHelperTextProps={{ error: values.errors.firstName }}
                  error={values.errors.firstName ? true : false}
                  label='First name'
                  name='_firstName'
                  onChange={handleChange}
                  required
                  value={values._firstName}
                  variant='outlined'
                  disabled={!editable}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                helperText={values.errors.lastName}
                FormHelperTextProps={{ error: values.errors.lastName }}
                error={values.errors.lastName ? true : false}
                name='_lastName'
                onChange={handleChange}
                required
                value={values._lastName}
                variant='outlined'
                disabled={!editable}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                fullWidth
                helperText={values.errors.email}
                FormHelperTextProps={{ error: values.errors.email }}
                error={values.errors.email ? true : false}
                label='Email Address'
                name='_email'
                onChange={handleChange}
                required
                value={values._email}
                variant='outlined'
                disabled
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='select-outlined-label-gender'>
                  Gender
                </InputLabel>
                <Select
                  labelId='select-outlined-label-gender'
                  id='select-outlined'
                  name='_gender'
                  defaultValue={values._gender}
                  value={values._gender}
                  onChange={handleChange}
                  label='Age'>
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item lg={6} xs={12}>
                <KeyboardDatePicker
                  helperText={values.errors.birthDate}
                  FormHelperTextProps={{ error: values.errors.birthDate }}
                  error={values.errors.birthDate ? true : false}
                  margin='normal'
                  variant='dialog'
                  inputVariant='outlined'
                  disableFuture
                  id='birth-date-picker-dialog'
                  label='Birth Date picker'
                  format='MMMM dd, yyyy'
                  value={values._birthDate}
                  disabled={!editable}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item lg={6} xs={12}>
              <TextField
                label='Age (Auto Calculate)'
                name='age'
                required
                value={`${values.age}`}
                variant='outlined'
                disabled
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Country
                _country={values._country}
                setValues={setValues}
                values={values}
                editable={editable}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <FormControl className={classes.FormControl} variant='outlined'>
                <OutlinedInput
                  name='_contactNumber'
                  onChange={handleChange}
                  error={values.errors.contactNumber ? true : false}
                  startAdornment={
                    <InputAdornment position='end'>
                      {values._dialCode ? (
                        `(${values._dialCode})`
                      ) : (
                        <CircularProgress color='inherit' size={20} />
                      )}
                    </InputAdornment>
                  }
                  aria-describedby='outlined-number-helper-text'
                  id='formatted-text-mask-input'
                  inputComponent={TextMaskCustom}
                  labelWidth={0}
                  value={values._contactNumber}
                  disabled={!editable}
                />
                <FormHelperText id='my-helper-text' error>
                  {values.errors.contactNumber}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                fullWidth
                helperText={values.errors.barangay}
                FormHelperTextProps={{ error: values.errors.barangay }}
                error={values.errors.barangay ? true : false}
                label='Barangay/District'
                name='_barangay'
                onChange={handleChange}
                required
                value={values._barangay}
                variant='outlined'
                disabled={!editable}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <City
                _city={values._city}
                setValues={setValues}
                values={values}
                editable={editable}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <TextField
                fullWidth
                helperText={values.errors.mySports}
                FormHelperTextProps={{ error: values.errors.mySports }}
                error={values.errors.mySports ? true : false}
                label='My Sports(comma separated)'
                name='_mySports'
                onChange={handleChange}
                required
                value={values._mySports}
                variant='outlined'
                disabled={!editable}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <div className={classnames({ [classes.display]: !editable })}>
          <Box p={2}>
            <Grid container justify='space-between'>
              <Grid item>
                <Tooltip title='Reset fields' aria-label='reset'>
                  <IconButton
                    color='secondary'
                    variant='contained'
                    onClick={handleReset}>
                    <RotateLeftOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleSubmit}>
                  Save details
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  getCountryProperties: PropTypes.func,
  updateUserProfileDetails: PropTypes.func,
  setBackdropLoading: PropTypes.func,
  clearSelectedCountryProps: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedCountry: state.utils.selectedCountry,
});

export default connect(mapStateToProps, {
  setBackdropLoading,
  getCountryProperties,
  updateUserProfileDetails,
  clearSelectedCountryProps,
})(ProfileDetails);
