import { User } from "next-auth";
import { createContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({
  initialData,
}: {
  initialData?: User;
}): JSX.Element {
  return <UserContext.Provider value={initialData} />;
}
