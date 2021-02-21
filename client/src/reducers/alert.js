import {
  SET_DIALOG,
  REMOVE_DIALOG,
  SET_LOADING_OVERLAY,
} from '../actions/types';

const initialState = {
  title: '',
  msg: '',
  btnTxt1: '',
  btnTxt2: '',
  link: '',
  backdropLoading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DIALOG:
      return {
        ...state,
        ...payload,
      };
    case REMOVE_DIALOG:
      return {
        ...state,
        ...initialState,
      };

    case SET_LOADING_OVERLAY:
      return {
        ...state,
        backdropLoading: payload,
      };
    default:
      return state;
  }
}
