import {
  SET_COUNTRIES,
  CLEAR_SELECTED_COUNTRY_PROPS,
  SET_COUNTRY_PROPS,
} from './types';
import axios from 'axios';

export const getCountries = () => async dispatch => {
  const res = await axios.get(
    'https://countriesnow.space/api/v0.1/countries/info?returns=flag',
  );
  dispatch({ type: SET_COUNTRIES, payload: res.data.data });
};

export const getCountryProperties = countrySelected => async dispatch => {
  const countryToFilter = { country: countrySelected };
  await axios
    .all([
      axios.post(
        'https://countriesnow.space/api/v0.1/countries/codes',
        countryToFilter,
      ),
      axios.post(
        'https://countriesnow.space/api/v0.1/countries/currency',
        countryToFilter,
      ),
      axios.post(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
        countryToFilter,
      ),
      axios.post(
        'https://countriesnow.space/api/v0.1/countries/cities',
        countryToFilter,
      ),
    ])
    .then(result => {
      dispatch({
        type: SET_COUNTRY_PROPS,
        payload: {
          countryName: result[0].data.data.name,
          dialCode: result[0].data.data.dial_code,
          currency: result[1].data.data.currency,
          flag: result[2].data.data.flag,
          cities: result[3].data.data,
        },
      });
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
};

export const clearSelectedCountryProps = () => async dispatch => {
  dispatch({ type: CLEAR_SELECTED_COUNTRY_PROPS });
};
