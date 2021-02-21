import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Material UI
import { TextField, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const City = ({ setValues, values, _city, cities, editable }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const isLoading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!isLoading) {
      return undefined;
    }
    if (active) {
      setOptions(cities);
    }
    return () => {
      active = false;
    };
  }, [isLoading, cities]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      setValues({
        ...values,
        _city: newValue,
      });
    }
  };

  useEffect(() => {
    if (!cities.includes(_city)) {
      setValues({
        ...values,
        _city: cities[0],
      });
    }
    //only cities must be watched
    // eslint-disable-next-line
  }, [cities]);

  return (
    <Autocomplete
      id='asynchronous-demo'
      value={_city}
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
      getOptionLabel={option =>
        option ? option : option === _city ? _city : cities[0]
      }
      options={options}
      loading={isLoading}
      renderOption={option => option}
      renderInput={params => (
        <TextField
          {...params}
          label='City'
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

City.propTypes = {
  getCountries: PropTypes.func,
  cities: PropTypes.array,
};

const mapStateToProps = state => ({
  cities: state.utils.selectedCountry.cities,
});

export default connect(mapStateToProps, null)(City);
