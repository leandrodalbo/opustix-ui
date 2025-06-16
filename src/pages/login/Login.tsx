import { useAuth } from "../../auth/AuthProvider";

const Login = () => {
  const { signinRedirect } = useAuth();
  return <button onClick={signinRedirect}>Login</button>;
};

export default Login;
