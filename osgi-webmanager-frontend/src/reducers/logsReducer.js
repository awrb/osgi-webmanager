import {
  FETCH_LOGS_DONE,
  FETCH_LOGS_PROGRESS,
  LOG_ADDED,
} from "../actions/actions";

const initialState = {
  logs: [],
  loading: false,
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
    default:
      return state;
  }
};

export default logsReducer;
