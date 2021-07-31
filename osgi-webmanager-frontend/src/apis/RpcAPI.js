import axios from "axios";
import { API_URL } from "../config";

const RpcAPI = axios.create({
  baseURL: `${API_URL}/service`,
});

export default RpcAPI;
