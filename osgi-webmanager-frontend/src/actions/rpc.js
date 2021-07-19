import {
  CLOSE_RPC_MODAL,
  OPEN_RPC_MODAL,
  PERFORM_RPC_DONE,
  PERFORM_RPC_PROGRESS,
  FETCH_SERVICES_DONE,
  FETCH_SERVICES_PROGRESS,
} from "./actions";
import RpcAPI from "../apis/RpcAPI";

export const toggleRpcModal = () => {
  return {
    type: OPEN_RPC_MODAL,
  };
};

export const closeRpcModal = () => {
  return {
    type: CLOSE_RPC_MODAL,
  };
};

export const performRpc = (data) => async (dispatch) => {
  dispatch({ type: PERFORM_RPC_PROGRESS });
  const response = await RpcAPI.put("/", data);
  dispatch({ type: PERFORM_RPC_DONE, payload: response.data });
};

export const fetchServices = () => async (dispatch) => {
  dispatch({ type: FETCH_SERVICES_PROGRESS });
  const response = await RpcAPI.get("/");
  dispatch({ type: FETCH_SERVICES_DONE, payload: response.data });
};
