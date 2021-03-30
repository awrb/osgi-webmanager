import { combineReducers } from "redux";
import logsReducer from "./logsReducer";
import bundlesReducer from "./bundlesReducer";

export default combineReducers({
  logs: logsReducer,
  bundles: bundlesReducer,
});
