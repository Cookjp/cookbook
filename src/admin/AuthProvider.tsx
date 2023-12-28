import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import authClient, { User } from "./auth-client";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setUserAction: Dispatch<SetStateAction<User | null>> = (value) => {
    if (typeof value === "function") {
      // If the value is a function, use the functional update form
      setUser((prevUser) => value(prevUser));
    } else {
      // If the value is not a function, set it directly
      setUser(value);
    }

    setLoading(false);
  };

  return { setUser: setUserAction, user, loading };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, user, loading } = useUser();
  const login = (email: string, password: string) => {
    return authClient.signIn(email, password).then((user) => {
      setUser(user);
      return user;
    });
  };

  const logout = () => {
    return authClient.signOut().then(() => setUser(null));
  };

  useEffect(() => {
    authClient.subscribe(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
