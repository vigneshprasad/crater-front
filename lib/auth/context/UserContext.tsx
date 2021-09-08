import { User } from "next-auth";
import { createContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({
  initialData,
  children,
}: {
  initialData?: User;
}) => {
  return (
    <UserContext.Provider value={initialData}>{children}</UserContext.Provider>
  );
};
