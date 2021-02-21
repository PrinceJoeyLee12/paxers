import api from '../utils/api';
import {
  GET_EVENTS,
  UPDATE_LIKES,
  GET_EVENT,
  SET_LOADING,
  SET_SHOW_SEARCHED,
  CLEAR_EVENT,
} from './types';

// Get events
export const getEvents = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.get('/events');
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: GET_EVENT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

// Add like
export const addRemoveLike = (id, errMessage, avatar) => async dispatch => {
  try {
    const res = await api.put(`/event/like/${id}`, { avatar });

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    if (err.response.status !== 500) {
      errMessage(err.response.statusTex);
    }
  }
};

// Get event
export const getEvent = id => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.get(`/event/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    // dispatch({
    //   type: GET_EVENT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const getEventByTitle = title => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.post(`/event/get-event/${title}`);

    dispatch(setLoading(false));
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: GET_EVENT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const setLoading = value => async dispatch => {
  dispatch({ type: SET_LOADING, payload: value });
};

export const setShowEvent = value => async dispatch => {
  dispatch({ type: SET_SHOW_SEARCHED, payload: value });
};
export const clearEvent = () => async dispatch =>
  dispatch({ type: CLEAR_EVENT });
