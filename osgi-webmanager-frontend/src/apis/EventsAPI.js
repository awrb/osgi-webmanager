import axios from "axios";

const EventsAPI = axios.create({
  baseURL: "http://localhost:8181/api/events",
});

export default EventsAPI;
