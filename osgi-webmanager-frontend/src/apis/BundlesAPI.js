import axios from "axios";

import { API_URL } from "../config";

const BundlesAPI = axios.create({
  baseURL: `${API_URL}/bundles`,
});

export default BundlesAPI;
