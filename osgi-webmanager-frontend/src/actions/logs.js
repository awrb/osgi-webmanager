import LogsAPI from "../apis/LogsAPI";
import {
  FETCH_LOGS_DONE,
  FETCH_LOGS_PROGRESS,
  PUBLISH_LOG_DONE,
  PUBLISH_LOG_PROGRESS,
} from "./actions";
import { LOG_TYPES } from "../utils/constants";

export const createParams = (limit, filter, level, exceptionsOnly) => {
  return { limit, filter, level, exceptionsOnly };
};

const defaultGetParams = createParams(100, "", LOG_TYPES.ALL, false);

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
