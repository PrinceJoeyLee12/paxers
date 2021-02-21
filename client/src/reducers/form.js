import { GET_FORM, CLEAR_FORM } from '../actions/types';

const initializeState = {};

// eslint-disable-next-line
export default function (state = initializeState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case GET_FORM:
      return { ...state, ...payload };
    case CLEAR_FORM:
      return (state = {});
    default:
      return state;
  }
}
