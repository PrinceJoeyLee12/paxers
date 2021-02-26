import api from '../utils/api';
import { toast } from 'react-toastify';
import {
  AUTH_ERROR,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_SUCCESS,
  LOGOUT,
} from './types';

import { getAuthMenuItems, getGuestMenuItems } from './menuItems';

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');
    dispatch(getAuthMenuItems());
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (typeof err.response !== 'undefined') {
      if ('data' in err.response) {
        dispatch({
          type: AUTH_ERROR,
        });
        return;
      }
    }
    console.log(err);
    toast.error('Server Error please try again later');
  }
};

// @route    GET api/auth/google
// @desc     Register User using Google Oauth
// @access   Public
export const googleSignIn = handleResponse => async dispatch => {
  try {
    await api.get('/auth/google');
    dispatch(loadUser());
  } catch (err) {
    handleResponse(err.response.data.msg, err.status);
    console.log(err);
  }
};

// @route    POST api/user/register
// @desc     Register User
// @access   Public
export const register = (
  formData,
  textChangeAfterSubmit,
  setErrors,
) => async dispatch => {
  try {
    textChangeAfterSubmit('Submitting...');
    const user = await api.post('/user/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: user.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (typeof err.response !== 'undefined') {
      if (err.response.status === 500 || err.response.status === 401)
        return toast.error(err.response.data.msg);
      if ('data' in err.response) setErrors(err.response.data);
    }
  }
};

// @route    POST api/auth/login
// @desc     Login in user
// @access   Public
export const login = (
  formData,
  textChangeAfterSubmit,
  setErrors,
) => async dispatch => {
  try {
    textChangeAfterSubmit('Submitting...');
    const res = await api.post('/auth/login', formData);
    textChangeAfterSubmit('Submitted');
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    if (err.response !== undefined) {
      setErrors(err.response.data);
      textChangeAfterSubmit('Submit');
      if (err.response.status === 500 || err.response.status === 401) {
        toast.error(err.response.data.msg);
      }
      dispatch({
        type: LOGIN_FAILURE,
      });
      return;
    }
    console.log(err);
  }
};

// @route    POST api/auth/forgotPassword
// @desc     Forgot Password
// @access   Public
export const forgotPassword = (
  textChangeAfterSubmit,
  setError,
  email,
) => async dispatch => {
  try {
    textChangeAfterSubmit('Sending...');
    const res = await api.post('/auth/forgotpassword', { email });
    textChangeAfterSubmit('Link Sent');
    console.log(res);
    toast.success(res.data.msg);
  } catch (err) {
    if (err.response) {
      if ('data' in err.response) {
        if (err.response.status === 500) {
          toast.error(err.response.data.msg);
        }
        setError(err.response.data);
        return;
      }
    }
    console.log(err);
  }
};

// @route    POST api/auth/reset-password
// @desc     Reset Password
// @access   Private
export const resetPassword = (
  formData,
  textChangeAfterSubmit,
  setErrors,
  history,
) => async dispatch => {
  try {
    textChangeAfterSubmit('Resetting...');
    const res = await api.post('/auth/reset-password', formData);
    textChangeAfterSubmit('Success');
    toast.success(res.data.msg);
    history.push('/login');
  } catch (err) {
    textChangeAfterSubmit('Submit');
    if (typeof err.response !== 'undefined') {
      if ('data' in err.response) {
        toast.error(err.response.data.msg);
        return setErrors(err.response.data);
      }
    }
    console.log(err);
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('prevPath');
  dispatch({ type: LOGOUT });
  dispatch(getGuestMenuItems());
};
