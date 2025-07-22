import axios from "axios";

const apiHost = import.meta.env.VITE_API_HOST;

const apiPublicFetch = axios.create({
  baseURL: `${apiHost}/api/public/ticketera`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiPublicFetch;
