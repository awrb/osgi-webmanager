import {
  FETCH_BUNDLES_DONE,
  FETCH_BUNDLES_PROGRESS,
  START_BUNDLE,
  STOP_BUNDLE,
  SET_BUNDLE_PREFERENCES,
  SELECT_BUNDLE,
  DISMISS_BUNDLE,
  BUNDLE_CHANGED,
} from "../actions/actions";
import { BUNDLE_STATES } from "../utils/constants";

const initialState = {
  bundles: [],
  loading: false,
  activities: [],
  selectedBundle: null,
  preferences: {
    name: "",
    state: BUNDLE_STATES.ACTIVE,
    id: "",
    modifiedAfter: "",
  },
};

const createActivity = (bundle, state) => ({
  text: `Bundle ${bundle.name} ${state}`,
  timestamp: new Date().toLocaleString(),
});

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
    case BUNDLE_CHANGED: {
      return {
        ...state,
        activities: [
          ...state.activities,
          createActivity(action.payload.payload, action.payload.type),
        ],
      };
    }
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
    case SELECT_BUNDLE:
      return {
        ...state,
        selectedBundle: action.payload,
      };
    case DISMISS_BUNDLE:
      return {
        ...state,
        selectedBundle: null,
      };
  }
};

export default bundlesReducer;
