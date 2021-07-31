import axios from "axios";
import { API_URL } from "../config";

const LogsAPI = axios.create({
  baseURL: `${API_URL}/logs`,
});

export default LogsAPI;
