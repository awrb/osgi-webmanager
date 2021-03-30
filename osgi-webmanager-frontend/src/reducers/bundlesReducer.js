import { FETCH_BUNDLES_DONE, FETCH_BUNDLES_PROGRESS } from "../actions/actions";

const initialState = {
  bundles: [],
  loading: false,
};

const bundlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUNDLES_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BUNDLES_DONE:
      return {
        ...state,
        loading: false,
        bundles: action.payload,
      };
    default:
      return initialState;
  }
};

export default bundlesReducer;
