import api from '../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  SET_REGISTRANTS_DATA,
  CLEAR_REGISTRANTS_DATA,
  SET_ROW_SELECTED,
} from './types';
import { setBackdropLoading } from './alert';

export const setRegistrantsData = (eventId, data, fee) => async dispatch => {
  try {
    console.log(fee);
    dispatch({
      type: SET_REGISTRANTS_DATA,
      payload: {
        eventId: eventId,
        data,
        payment: {
          amountToPay: fee,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//send to back end
export const storeRegistrantsData = (
  userId,
  eventId,
  eventTitle,
  dataFromPaymentSelected,
  data,
  payThrough,
  amountToPay,
  reservationStatus,
  token,
) => async dispatch => {
  try {
    dispatch(setBackdropLoading(true));
    const res = await api.post(`registrants/data/${userId}/${eventId}`, {
      userId,
      eventId,
      eventTitle,
      dataFromPaymentSelected,
      data,
      payThrough,
      amountToPay,
      token,
    });
    dispatch(setBackdropLoading(false));
    reservationStatus(res.data.msg, 'success');
  } catch (err) {
    dispatch(setBackdropLoading(false));
    if (err.status === 500)
      toast.error(
        "We're sorry there's something wrong on logging your data in our database",
      );
    console.log(err.response);
    if (err.response.data.msg) {
      reservationStatus(err.response.data.msg, 'error');
    }
  }
};

//Upload Photo to Cloud
export const uploadImage = (
  formData,
  registrantId,
  handleResponse,
) => async dispatch => {
  try {
    const res = await api.post(
      `/registrants/upload-receipt-image/${registrantId}`,
      formData,
    );

    const { msg, newRegistrantData } = res.data;
    handleResponse(msg, res.status);
    dispatch({
      type: SET_ROW_SELECTED,
      payload: {
        paymentImage: newRegistrantData.paymentImage,
        status: newRegistrantData.status,
        datePaymentProcessed: moment(
          newRegistrantData.payment.datePaymentProcessed,
        ).format('MMM DD, YYYY hh:mm a'),
      },
    });
  } catch (err) {
    console.error(err);
    handleResponse(err.response.data.msg, err.status);
  }
};

// clear dat on redux
export const clearRegistrantsData = () => async dispatch => {
  dispatch({ type: CLEAR_REGISTRANTS_DATA });
};
