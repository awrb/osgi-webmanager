const { EVENT_ADDED } = require("../actions/actions");

const initialState = {
  events: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_ADDED: {
      console.log("Event ", action.payload);
      return { ...state, events: [...state.events, action.payload.payload] };
    }
    default:
      return state;
  }
};

export default eventsReducer;
