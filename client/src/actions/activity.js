import api from '../utils/api';
import {
  LOAD_UPCOMING_ACTIVITIES,
  LOAD_RECENT_ACTIVITIES,
  SET_ROW_SELECTED,
  REMOVE_ROW_SELECTED,
  SET_CHANGES,
} from './types';
import moment from 'moment';
import { toast } from 'react-toastify';
import { charReplacer } from '../utils/textFormater';

// Get Recent Activities (top 10 first)
export const getRecentActivities = (userId, status) => async dispatch => {
  try {
    const res = await api.get(`/activity/recent/${userId}`);
    status(res.status.toString());
    dispatch({
      type: LOAD_RECENT_ACTIVITIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
  }
};

// Get Upcoming Activities
export const getUpcomingActivities = (userId, status) => async dispatch => {
  try {
    const res = await api.get(`/activity/upcoming-activities/${userId}`);
    status(res.status.toString());
    if (res.data.msg) return toast.error(res.data.msg);
    dispatch({
      type: LOAD_UPCOMING_ACTIVITIES,
      payload: [...res.data],
    });
  } catch (err) {
    // status(err.status.toString());
    console.log(err);
  }
};

// Set row selected
export const setRowSelected = row => async dispatch => {
  dispatch({
    type: SET_ROW_SELECTED,
    payload: row,
  });
};

//get registrant data by transactionId and userId and set it to rowSelected
export const getUpcomingEventByTransactionId = (
  _userId,
  _transactionId,
) => async dispatch => {
  try {
    const res = await api.get(
      `/registrants/get-upcoming-activity-by-transactionId/${_userId}/${_transactionId}`,
    );

    const {
      payment: { payThrough, amountToPay, timeToExpire },
      paymentImage,
      _id,
      userId,
      event: { title, startDate, endDate, distanceTypeIsKM },
      transactionId,
      status,
      data: { categorySelected },
      dateRegistered,
    } = res.data;
    dispatch({
      type: SET_ROW_SELECTED,
      payload: {
        id: _id,
        no: 1,
        distance: `${categorySelected} ${distanceTypeIsKM ? 'km' : 'miles'}`,
        dateReserved: `${moment(dateRegistered).format(
          'MMM DD, YYYY hh:mm a',
        )}`,
        nameOfEvent: `${title}`,
        dateOfEvent: `${
          moment(startDate).isSame(moment(startDate), 'days')
            ? `${moment(endDate).format('MMM DD, YYYY')}`
            : `${`${moment(endDate).format('MMM DD, YYYY')} - ${moment(
                endDate,
              ).format('MMM DD, YYYY')}`}`
        }`,
        expirationDate: `${moment(timeToExpire).format(
          'MMM DD, YYYY hh:mm a',
        )}`,
        paymentMethod: `${payThrough}`,
        amountToPay: `₱ ${amountToPay}`,
        transactionId: `${transactionId}`,
        status: `${status}`,
        link: `${process.env.REACT_APP_CLIENT_URL}/${charReplacer(
          title,
          ' ',
          '-',
        ).toLowerCase()}/registration/${userId}/${transactionId}`,
        paymentImage,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//remove Row Selected
export const removeRowSelected = () => async dispatch => {
  dispatch({ type: REMOVE_ROW_SELECTED });
};

export const setChanges = value => async dispatch => {
  dispatch({ type: SET_CHANGES, payload: value });
};
