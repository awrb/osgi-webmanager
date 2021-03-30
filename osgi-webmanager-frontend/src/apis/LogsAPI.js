import axios from "axios";

const LogsAPI = axios.create({
  baseURL: "http://localhost:8181/api/logs",
});

export default LogsAPI;
