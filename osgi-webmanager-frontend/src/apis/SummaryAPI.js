import axios from "axios";
import { API_URL } from "../config";

const SummaryAPI = axios.create({
  baseURL: `${API_URL}/summary`,
});

export default SummaryAPI;
