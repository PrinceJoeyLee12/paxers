import {
  GET_EVENTS,
  UPDATE_LIKES,
  GET_EVENT,
  SET_LOADING,
  SET_SHOW_SEARCHED,
  CLEAR_EVENT,
  SET_TITLES,
} from '../actions/types';

const initialState = {
  events: [],
  event: {},
  loading: false,
  showEvent: false,
  titles: [],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
        showEvent: false,
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
        showEvent: true,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === payload.id ? { ...event, likes: payload.likes } : event,
        ),
        loading: false,
        showEvent: false,
      };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_SHOW_SEARCHED:
      return { ...state, showEvent: payload };
    case CLEAR_EVENT:
      return {
        ...state,
        event: () => {
          for (const prop of Object.getOwnProperty(state.event))
            delete state.event[prop];
        },
      };

    case SET_TITLES:
      return {
        ...state,
        titles: payload,
      };
    default:
      return state;
  }
}
