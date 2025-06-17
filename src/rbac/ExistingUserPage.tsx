import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

interface ExistingUserPageProps {
  children: JSX.Element;
  roles?: string[];
}

export const ExistingUserPage = ({
  children,
  roles = ["USER"],
}: ExistingUserPageProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="spinner">Loading...</div>;

  const realmAccess = user?.profile?.realm_access as
    | { roles: string[] }
    | undefined;

  const userRoles: string[] = realmAccess?.roles || [];

  if (!roles.some((r) => userRoles.includes(r)))
    return <Navigate to="/unauthorized" replace />;

  return (user && children) || <Navigate to="/login" replace />;
};
