import BundlesAPI from "../apis/BundlesAPI";
import { BUNDLE_STATES } from "../utils/constants";
import {
  FETCH_BUNDLES_DONE,
  FETCH_BUNDLES_PROGRESS,
  STOP_BUNDLE,
  START_BUNDLE,
  SET_BUNDLE_PREFERENCES,
} from "./actions";

export const createParams = (name, id, state) => {
  return { name, id, state };
};

export const defaultGetParams = createParams("", null, BUNDLE_STATES.ALL);

export const fetchBundles = (params = defaultGetParams) => async (dispatch) => {
  dispatch({ type: FETCH_BUNDLES_PROGRESS });
  const response = await BundlesAPI.get("/", { params });
  dispatch({ type: FETCH_BUNDLES_DONE, payload: response.data });
};

export const stopBundle = (bundleId) => async (dispatch) => {
  const response = await BundlesAPI.put(`${bundleId}/stop`);
  dispatch({ type: STOP_BUNDLE, payload: bundleId });
};

export const startBundle = (bundleId) => async (dispatch) => {
  const response = await BundlesAPI.put(`${bundleId}/start`);
  dispatch({ type: START_BUNDLE, payload: bundleId });
};

export const setPreferences = (preferences) => (dispatch) => {
  dispatch({ type: SET_BUNDLE_PREFERENCES, payload: preferences });
};
