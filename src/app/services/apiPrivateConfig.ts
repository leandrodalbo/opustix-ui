import axios from "axios";
import { UserManager } from "oidc-client-ts";
import { oidcConfig } from "../auth/oidcConfig";

const userManager = new UserManager(oidcConfig);

const apiPrivateFetch = axios.create({
  baseURL: "/api/private/ticketera",
  headers: {
    "Content-Type": "application/json",
  },
});

apiPrivateFetch.interceptors.request.use(async (config) => {
  const user = await userManager.getUser();
  if (user && !user.expired && user.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;
});

export default apiPrivateFetch;
