import SummaryAPI from "../apis/SummaryAPI";
import { FETCH_SUMMARY_DONE, FETCH_SUMMARY_PROGRESS } from "./actions";

export const fetchSummary = () => async (dispatch) => {
  dispatch({ type: FETCH_SUMMARY_PROGRESS });
  const response = await SummaryAPI.get("/");
  dispatch({ type: FETCH_SUMMARY_DONE, payload: response.data });
};
