import { useContext } from "react";

import { AuthStateContext } from "../context/auth";
import { AuthState } from "../types/context";

export default function useAuthState(): AuthState {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}
