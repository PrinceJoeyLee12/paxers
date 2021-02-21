import {
  SET_REGISTRANTS_DATA,
  SUBMITTING_FORM,
  CLEAR_REGISTRANTS_DATA,
  LOGOUT,
} from '../actions/types';

const initializeState = {
  eventId: '',
  isSubmitting: false,
  data: {
    firstName: '',
    lastName: '',
    birthday: '',
    age: 0,
    cellNumber: '',
    gender: '',
    email: '',
    address: '',
    citizenship: '',
    categorySelected: '',
  },
  payment: {
    optionSelected: '',
    amountToPay: null,
  },
};

// eslint-disable-next-line
export default function (state = initializeState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case SET_REGISTRANTS_DATA:
      return { ...state, ...payload };
    case SUBMITTING_FORM:
      return { ...state, isSubmitting: payload };
    case CLEAR_REGISTRANTS_DATA:
    case LOGOUT:
      return { ...state, ...initializeState };
    default:
      return state;
  }
}
