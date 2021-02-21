import {
  SET_COUNTRIES,
  SET_COUNTRY_PROPS,
  CLEAR_SELECTED_COUNTRY_PROPS,
} from '../actions/types';

const initialState = {
  selectedCountry: {
    countryName: '',
    dialCode: '',
    flag: '',
    currency: '',
    cities: [],
  },
  countries: [],
  cities: [],
  states: [],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    case SET_COUNTRY_PROPS:
      return {
        ...state,
        selectedCountry: payload,
      };
    case CLEAR_SELECTED_COUNTRY_PROPS:
      return {
        ...state,
        selectedCountry: { ...initialState.selectedCountry },
      };
    default:
      return state;
  }
}
