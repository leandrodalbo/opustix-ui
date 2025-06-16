import { UserManagerSettings } from "oidc-client-ts";

export const oidcConfig: UserManagerSettings = {
  authority: "http://localhost:8080/realms/ticketera",
  client_id: "react-client",
  redirect_uri: "http://localhost:5173/callback",
  silent_redirect_uri: "http://localhost:5173/silent-redirect.html",
  post_logout_redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "openid profile email roles",
  automaticSilentRenew: true,
};
