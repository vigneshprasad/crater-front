import { useContext } from "react";

import { IProfileState, ProfileContext } from "../context/ProfileContext";

// eslint-disable-next-line import/prefer-default-export
export function useProfile(): IProfileState {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("You need to wrap ProfileProvider.");
  }

  return { ...context } as const;
}
