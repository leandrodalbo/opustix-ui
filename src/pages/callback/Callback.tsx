import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserManager } from "oidc-client-ts";
import { oidcConfig } from "../../auth/oidcConfig";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    new UserManager(oidcConfig)
      .signinRedirectCallback()
      .then(() => navigate("/profile"))
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, [navigate]);

  return <p>Signing in...</p>;
};

export default Callback;
