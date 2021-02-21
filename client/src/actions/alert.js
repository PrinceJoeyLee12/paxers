import { SET_DIALOG, REMOVE_DIALOG, SET_LOADING_OVERLAY } from './types';

export const setDialog = (
  title,
  msg,
  btnTxt1,
  btnTxt2,
  link,
) => async dispatch => {
  try {
    dispatch({
      type: SET_DIALOG,
      payload: {
        title: title,
        msg: msg,
        btnTxt1: btnTxt1,
        btnTxt2: btnTxt2,
        link: link,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeDialog = () => async dispatch => {
  dispatch({ type: REMOVE_DIALOG });
};

export const setBackdropLoading = value => async dispatch => {
  dispatch({ type: SET_LOADING_OVERLAY, payload: value });
};
