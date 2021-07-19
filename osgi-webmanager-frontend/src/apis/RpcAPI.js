import axios from "axios";

const RpcAPI = axios.create({
  baseURL: "http://localhost:8181/api/service",
});

export default RpcAPI;
