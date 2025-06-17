import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { signinRedirect, user } = useAuth();

  if (user) return <Navigate to="/" replace />;
  return <button onClick={signinRedirect}>Login</button>;
};

export default Login;
