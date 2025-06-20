import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/api", // Must match the backend
  withCredentials: true,                // Critical for cookie auth
});

export default axios;
