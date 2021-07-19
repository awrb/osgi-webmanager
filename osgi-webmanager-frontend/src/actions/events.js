import EventsAPI from "../apis/EventsAPI";

export const publishEvent = (event) => (dispatch) => {
  EventsAPI.post("/", event);
};
