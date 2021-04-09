import {
  FETCH_LOGS_DONE,
  FETCH_LOGS_PROGRESS,
  LOG_ADDED,
  SET_LOG_PREFERENCES,
} from "../actions/actions";

import { defaultGetParams } from "../actions/logs";

const initialState = {
  logs: [],
  loading: false,
  preferences: defaultGetParams,
};

const logsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGS_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOGS_DONE:
      return {
        ...state,
        loading: false,
        logs: action.payload,
      };
    case LOG_ADDED:
      return {
        ...state,
        logs: [...state.logs, action.payload.payload],
      };
    case SET_LOG_PREFERENCES:
      return {
        ...state,
        preferences: action.payload,
      };
    default:
      return state;
  }
};

export default logsReducer;
