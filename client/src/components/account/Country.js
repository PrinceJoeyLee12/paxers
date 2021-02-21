import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { getCountries } from '../../actions/utils';

//Material UI
import { TextField, CircularProgress, Chip, Avatar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Country = ({
  setValues,
  values,
  _country,
  editable,
  getCountries,
  utils: { countries },
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const isLoading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!isLoading) {
      return undefined;
    }
    if (countries.length === 0) getCountries();
    if (active) {
      setOptions(countries);
    }
    return () => {
      active = false;
    };
  }, [isLoading, getCountries, countries]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      setValues({
        ...values,
        _country: newValue.name,
        _flag: newValue.flag,
        _city: '',
      });
    }
  };

  return (
    <Autocomplete
      id='asynchronous-demo'
      value={_country}
      size='medium'
      disabled={!editable}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        handleChange(event, newValue);
      }}
      getOptionSelected={(option, value) => true}
      getOptionLabel={option => (option.name ? option.name : _country)}
      options={options}
      loading={isLoading}
      renderOption={option => (
        <Chip
          avatar={<Avatar alt={`${option.name}`} src={`${option.flag}`} />}
          label={`${option.name}`}
          variant='outlined'
        />
      )}
      renderInput={params => (
        <TextField
          {...params}
          label='Country'
          variant='outlined'
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {isLoading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};

Country.propTypes = {
  getCountries: PropTypes.func,
  countries: PropTypes.array,
};

const mapStateToProps = state => ({
  utils: state.utils,
});

export default connect(mapStateToProps, { getCountries })(Country);
