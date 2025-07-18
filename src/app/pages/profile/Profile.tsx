import { useAuth } from "../../auth/AuthProvider";

export default function Profile() {
  const { user, signinRedirect, signoutRedirect } = useAuth();

  return (
    <div
      className={`text-lg font-medium flex-1 flex justify-center items-center gap-6`}
    >
      {user && (
        <button
          onClick={signoutRedirect}
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          LOGOUT
        </button>
      )}
      {!user && (
        <button
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={signinRedirect}
        >
          LOGIN
        </button>
      )}
    </div>
  );
}
