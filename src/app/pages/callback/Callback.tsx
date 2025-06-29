import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserManager } from "oidc-client-ts";
import { oidcConfig } from "../../auth/oidcConfig";

const Callback = () => {
  const navigate = useNavigate();
  const hasHandledCallback = useRef(false);
  if (hasHandledCallback.current) return;
  hasHandledCallback.current = true;

  useEffect(() => {
    new UserManager(oidcConfig)
      .signinRedirectCallback()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  return <p>Signing in...</p>;
};

export default Callback;
