import { useContext } from "react";

import { IUserState, UserContext } from "../context/UserContext";

// eslint-disable-next-line import/prefer-default-export
export function useUser(): IUserState {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("You need to wrap UserProivder.");
  }

  return { ...context } as const;
}
