const { EVENT_ADDED } = require("../actions/actions");

const initialState = {
  events: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_ADDED: {
      return { ...state, events: [...state.events, action.payload.payload] };
    }
    default:
      return state;
  }
};

export default eventsReducer;
