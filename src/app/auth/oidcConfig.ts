import { UserManagerSettings } from "oidc-client-ts";

export const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_AUTHORITY_REALM,
  client_id: import.meta.env.VITE_AUTHORITY_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_AUTHORITY_REDIRECT_URI,
  silent_redirect_uri: import.meta.env.VITE_AUTHORITY_SILENT_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env
    .VITE_AUTHORITY_POST_LOGOUT_REDIRECT_URI,
  response_type: import.meta.env.VITE_AUTHORITY_RESPONSE_TYPE,
  scope: import.meta.env.VITE_AUTHORITY_SCOPE,
};
