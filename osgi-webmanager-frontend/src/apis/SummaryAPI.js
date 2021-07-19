import axios from "axios";

const SummaryAPI = axios.create({
  baseURL: "http://localhost:8181/api/summary",
});

export default SummaryAPI;
