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

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const realmAccess = user?.profile?.realm_access as
    | { roles: string[] }
    | undefined;

  const userRoles: string[] = realmAccess?.roles || [];

  if (!roles.some((r) => userRoles.includes(r)))
    return <Navigate to="/unauthorized" replace />;

  return children;
};
