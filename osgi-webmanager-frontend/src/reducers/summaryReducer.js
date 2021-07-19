import { FETCH_SUMMARY_PROGRESS, FETCH_SUMMARY_DONE } from "../actions/actions";

const initialState = {
  bundleSummary: null,
  logSummary: null,
  jvmProperties: null,
  loading: false,
};

const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUMMARY_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUMMARY_DONE:
      return {
        ...state,
        loading: false,
        logSummary: action.payload.logSummary,
        bundleSummary: action.payload.bundleSummary,
        jvmProperties: action.payload.jvmProperties,
      };
    default:
      return state;
  }
};

export default summaryReducer;
