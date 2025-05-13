
import React, { createContext, useState, useContext, ReactNode } from "react";

export type UserRole = "patient" | "doctor" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
}

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // This would normally be an API call
    console.log("Logging in with", email, password, role);

    // Simulate login
    setUser({
      id: "user-123",
      name: role === "patient" ? "Jane Smith" : "Dr. Sarah Johnson",
      email,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    // This would normally be an API call
    console.log("Signing up with", email, password, name, role);

    // Simulate signup
    setUser({
      id: "user-" + Math.floor(Math.random() * 10000),
      name,
      email,
      role,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
