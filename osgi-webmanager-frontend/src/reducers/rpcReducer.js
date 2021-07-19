import {
  CLOSE_RPC_MODAL,
  OPEN_RPC_MODAL,
  FETCH_SERVICES_DONE,
  FETCH_SERVICES_PROGRESS,
  PERFORM_RPC_DONE,
  PERFORM_RPC_PROGRESS,
} from "../actions/actions";

const initialState = {
  modalOpen: false,
  services: [],
  result: null,
  loading: false,
};

const rpcReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_RPC_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case CLOSE_RPC_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    case FETCH_SERVICES_PROGRESS:
    case PERFORM_RPC_PROGRESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_SERVICES_DONE: {
      console.log(action);
      return {
        ...state,
        services: action.payload,
      };
    }
    case PERFORM_RPC_DONE:
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};

export default rpcReducer;
