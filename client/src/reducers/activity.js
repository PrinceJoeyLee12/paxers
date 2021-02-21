import {
  LOAD_RECENT_ACTIVITIES,
  LOAD_UPCOMING_ACTIVITIES,
  SET_ROW_SELECTED,
  REMOVE_ROW_SELECTED,
  SET_CHANGES,
  LOGOUT,
} from '../actions/types';

const initialState = {
  isThereAChanges: false,
  rowSelected: {},
  recentActivities: [],
  personRecords: [],
  upcomingActivities: [],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_RECENT_ACTIVITIES:
      return { ...state, recentActivities: payload };
    case LOAD_UPCOMING_ACTIVITIES:
      return { ...state, upcomingActivities: payload };
    case SET_ROW_SELECTED:
      return { ...state, rowSelected: { ...state.rowSelected, ...payload } };

    case REMOVE_ROW_SELECTED:
      return {
        ...state,
        rowSelected: {},
      };
    case SET_CHANGES:
      return {
        ...state,
        isThereAChanges: payload,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
