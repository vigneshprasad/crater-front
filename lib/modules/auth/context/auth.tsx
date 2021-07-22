import { User } from "next-auth";

import { createContext } from "react";

import useUser from "../hooks/user";
import { AuthState } from "../types/context";

const intial: AuthState = {};

export const AuthStateContext = createContext<AuthState>(intial);

const AuthProvider: React.FC<{ user: User }> = (props) => {
  const { user } = useUser({ user: props.user });
  return (
    <AuthStateContext.Provider value={{ user }}>
      {props.children}
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
