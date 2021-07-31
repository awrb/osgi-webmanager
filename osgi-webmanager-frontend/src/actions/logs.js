import LogsAPI from "../apis/LogsAPI";
import {
  FETCH_LOGS_DONE,
  FETCH_LOGS_PROGRESS,
  PUBLISH_LOG_DONE,
  PUBLISH_LOG_PROGRESS,
  SET_LOG_PREFERENCES,
  READ_NOTIFICATION,
  CLEAR_READ_NOTIFICATIONS,
} from "./actions";
import { LOG_TYPES } from "../utils/constants";

export const createParams = (limit, filter, level, exceptionsOnly) => {
  return { limit, filter, level, exceptionsOnly };
};

export const defaultGetParams = createParams(100, "", LOG_TYPES.ALL, false);

export const fetchLogs = (params = defaultGetParams) => async (dispatch) => {
  dispatch({ type: FETCH_LOGS_PROGRESS });
  const response = await LogsAPI.get("/", { params });
  dispatch({ type: FETCH_LOGS_DONE, payload: response.data });
};

export const publishLog = (data) => async (dispatch) => {
  dispatch({ type: PUBLISH_LOG_PROGRESS });
  const response = await LogsAPI.post("/", data);
  dispatch({ type: PUBLISH_LOG_DONE, payload: response.data });
};

export const setPreferences = (preferences) => (dispatch) => {
  dispatch({ type: SET_LOG_PREFERENCES, payload: preferences });
};

export const readNotification = (idx) => (dispatch) => {
  dispatch({ type: READ_NOTIFICATION, payload: idx });
};

export const clearReadNotifications = () => (dispatch) => {
  dispatch({ type: CLEAR_READ_NOTIFICATIONS });
};
