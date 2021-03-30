import BundlesAPI from "../apis/BundlesAPI";
import { FETCH_BUNDLES_DONE, FETCH_BUNDLES_PROGRESS } from "./actions";

export const fetchBundles = async (dispatch) => {
  dispatch({ type: FETCH_BUNDLES_PROGRESS });
  const response = await BundlesAPI.get("/", {});
  dispatch({ type: FETCH_BUNDLES_DONE, payload: response.data });
};
