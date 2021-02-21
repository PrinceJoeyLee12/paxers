import api from '../utils/api';
import { toast } from 'react-toastify';

import { GET_FORM, CLEAR_FORM } from './types';

export const getForm = eventId => async dispatch => {
  try {
    const res = await api.get(`/form/${eventId}`);

    dispatch({
      type: GET_FORM,
      payload: res.data,
    });
  } catch (err) {
    if (err.status === 500)
      toast.error(
        "We're sorry, there's something wrong in our side. Please try again later...",
      );
    console.log(err);
  }
};

export const clearForm = () => async dispatch => {
  dispatch({ type: CLEAR_FORM });
};
