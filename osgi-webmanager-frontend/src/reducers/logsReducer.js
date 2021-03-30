import { FETCH_LOGS_DONE, FETCH_LOGS_PROGRESS } from "../actions/actions";

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
    default:
      return state;
  }
};

export default logsReducer;
