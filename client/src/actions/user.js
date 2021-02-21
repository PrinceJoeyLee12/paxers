import api from '../utils/api';
import { UPDATE_USER, SET_DISTANCE_TYPE } from './types';

// @route    POST api/user/update-user-profile-picture/userId
// @desc     Update user's Profile Picture
// @access   Private
export const updateUserProfilePicture = (
  formData,
  userId,
) => async dispatch => {
  try {
    const res = await api.post(
      `/user/update-user-profile-picture/${userId}`,
      formData,
    );
    console.log(res.data);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    if (typeof err.response !== 'undefined') {
      if ('data' in err.response) {
        console.log(err.response.data.msg);
        return;
      }
    }
    console.log(err);
  }
};

// @route    POST api/user/update-user-profile-details/userId
// @desc     Update User's Profile Details
// @access   Private
export const updateUserProfileDetails = (
  formData,
  userId,
  handleResponse,
) => async dispatch => {
  try {
    const res = await api.post(
      `/user/update-user-profile-details/${userId}`,
      formData,
    );

    handleResponse(res.data.msg, res.status);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });
  } catch (err) {
    if (err.response.status === 403 && err.response.data) {
      return handleResponse(err.response.data, err.response.status);
    }
    handleResponse(err.msg, err.response.status);
  }
};

export const setDistanceType = value => async dispatch => {
  dispatch({ type: SET_DISTANCE_TYPE, payload: value });
};

// @route    PUT api/user/settings/userId
// @desc     Update Settings for distance Type
// @access   Private
export const saveDistanceType = (value, userId) => async dispatch => {
  try {
    await api.put(`/user/settings/change-unit/${userId}`, {
      preferredMeasurementIsMetric: value,
    });
  } catch (err) {
    console.log(err);
  }
};

// @route    POST api/user/settings/change-password/userId
// @desc     Update Settings for distance Type
// @access   Private
export const changePassword = (
  formData,
  userId,
  buttonTextAfterSubmit,
  setErrors,
) => async dispatch => {
  try {
    const res = await api.post(
      `/user/settings/change-password/${userId}`,
      formData,
    );
    buttonTextAfterSubmit(res.status);
  } catch (err) {
    buttonTextAfterSubmit(err.response.status);
    if (err.response.data) {
      setErrors(err.response.data);
    } else if (err.response.msg) {
      console.log(err.response.msg);
    }
  }
};

// @route    POST api/user/settings/send-temporary-password/userId
// @desc     Update Settings for distance Type
// @access   Private
export const sendTemporaryPassword = (
  email,
  userId,
  buttonTextChangeEmailAfterSubmit,
) => async dispatch => {
  try {
    const res = await api.post(
      `/user/settings/send-temporary-password/${userId}`,
      {
        email,
      },
    );

    console.log(res.data);
    buttonTextChangeEmailAfterSubmit(res.data.msg, res.status);
  } catch (err) {
    console.log(err.response);
  }
};
