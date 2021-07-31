import {
  FETCH_LOGS_DONE,
  FETCH_LOGS_PROGRESS,
  LOG_ADDED,
  READ_NOTIFICATION,
  CLEAR_READ_NOTIFICATIONS,
  SET_LOG_PREFERENCES,
} from "../actions/actions";

import { LOG_TYPES } from "../utils/constants";

import { defaultGetParams } from "../actions/logs";

const initialState = {
  logs: [],
  loading: false,
  preferences: defaultGetParams,
  alarms: [],
};

const createAlarm = (log) => {
  return {
    message: log.message,
    checked: false,
  };
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
      const { level } = action.payload.payload;

      if (level === LOG_TYPES.ERROR) {
        const alarm = createAlarm(action.payload.payload);
        return {
          ...state,
          logs: [...state.logs, action.payload.payload],
          alarms: [...state.alarms, alarm],
        };
      } else {
        return {
          ...state,
          logs: [...state.logs, action.payload.payload],
        };
      }
    case READ_NOTIFICATION:
      return {
        ...state,
        alarms: state.alarms.map((alarm, idx) =>
          idx === action.payload ? { ...alarm, checked: true } : alarm
        ),
      };
    case CLEAR_READ_NOTIFICATIONS:
      return {
        ...state,
        alarms: state.alarms.filter((alarm) => !alarm.checked),
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
