import axios from "axios";

const BundlesAPI = axios.create({
  baseURL: "http://localhost:8181/api/bundles",
});

export default BundlesAPI;
