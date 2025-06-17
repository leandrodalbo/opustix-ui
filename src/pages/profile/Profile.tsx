import { useAuth } from "../../auth/AuthProvider";

export default function Profile() {
  const { signoutRedirect } = useAuth();
  return (
    <button
      onClick={signoutRedirect}
      style={{ padding: "10px", fontSize: "16px" }}
    >
      Logout
    </button>
  );
}
