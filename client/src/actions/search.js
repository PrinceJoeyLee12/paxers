import api from '../utils/api';
import { SET_TITLES } from './types';

export const getEventsTitles = () => async dispatch => {
  function sleep(delay = 0) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  try {
    const eventsTitles = await api.get('/event/all');
    await sleep(1e3);
    console.log(eventsTitles.data);
    dispatch({ type: SET_TITLES, payload: eventsTitles.data });
  } catch (err) {
    console.log(err);
  }
};
