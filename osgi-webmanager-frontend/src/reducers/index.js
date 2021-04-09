import { combineReducers } from "redux";
import logsReducer from "./logsReducer";
import bundlesReducer from "./bundlesReducer";
import eventsReducer from "./eventsReducer";

export default combineReducers({
  logs: logsReducer,
  bundles: bundlesReducer,
  events: eventsReducer,
});
