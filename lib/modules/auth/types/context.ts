import { User } from "next-auth";

export type AuthState = {
  user?: User;
};
