import axios from "axios";
import { API_URL } from "../config";

const EventsAPI = axios.create({
  baseURL: `${API_URL}/events`,
});

export default EventsAPI;
