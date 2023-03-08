import {
  SIGNIN_SUCCESS,
  SIGNOUT,
  ALL_EVENTS_SUCCESS,
  EVENT_DETAIL_SUCCESS,
  ONGOING_EVENTS_SUCCESS,
  UPDATE_SUCCESS,
} from "./admin.constants";

export const AdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUCCESS:
      return { success: false };

    case ONGOING_EVENTS_SUCCESS:
      return {
        ...state,
        success: true,
        onGoingEvents: action.payload,
      };

    case ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };
    case EVENT_DETAIL_SUCCESS:
      return {
        ...state,
        event: action.payload,
      };

    default:
      return state;
  }
};

export const loginGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        ...state,
        auth: action.payload,
      };
    case SIGNOUT:
      return { ...state, auth: null };
    default:
      return state;
  }
};
