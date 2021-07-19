import { combineReducers } from "redux";
import logsReducer from "./logsReducer";
import bundlesReducer from "./bundlesReducer";
import eventsReducer from "./eventsReducer";
import rpcReducer from "./rpcReducer";
import summaryReducer from "./summaryReducer";

export default combineReducers({
  logs: logsReducer,
  bundles: bundlesReducer,
  events: eventsReducer,
  rpc: rpcReducer,
  summary: summaryReducer,
});
