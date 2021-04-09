import {
  FETCH_BUNDLES_DONE,
  FETCH_BUNDLES_PROGRESS,
  START_BUNDLE,
  STOP_BUNDLE,
  SET_BUNDLE_PREFERENCES,
} from "../actions/actions";
import { BUNDLE_STATES } from "../utils/constants";

const initialState = {
  bundles: [],
  loading: false,
  preferences: {
    name: "",
    state: BUNDLE_STATES.ACTIVE,
    id: "",
    modifiedAfter: "",
  },
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
    case START_BUNDLE:
      return {
        ...state,
        bundles: state.bundles.map((bundle) =>
          bundle.id === action.payload
            ? {
                ...bundle,
                state: BUNDLE_STATES.ACTIVE,
              }
            : bundle
        ),
      };
    case STOP_BUNDLE:
      return {
        ...state,
        bundles: state.bundles.map((bundle) =>
          bundle.id === action.payload
            ? {
                ...bundle,
                state: BUNDLE_STATES.RESOLVED,
              }
            : bundle
        ),
      };
    case SET_BUNDLE_PREFERENCES:
      return {
        ...state,
        preferences: action.payload,
      };
    default:
      return state;
  }
};

export default bundlesReducer;
