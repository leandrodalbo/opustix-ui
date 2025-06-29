import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserManager, User } from "oidc-client-ts";
import { oidcConfig } from "./oidcConfig";

const userManager = new UserManager(oidcConfig);

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  signinRedirect: () => void;
  signoutRedirect: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userManager.getUser().then((loadedUser) => {
      if (loadedUser && !loadedUser.expired) {
        setUser(loadedUser);
      }
      setIsLoading(false);
    });

    userManager.events.addUserLoaded(setUser);
    userManager.events.addUserUnloaded(() => setUser(null));
  }, []);

  const signinRedirect = () => userManager.signinRedirect();
  const signoutRedirect = () => userManager.signoutRedirect();

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signinRedirect, signoutRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
