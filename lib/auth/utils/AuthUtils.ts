import { signin, signOut } from "next-auth/client";

export const Login = async (phoneNumber: string, otp: string) => {
  const res = await signin("credentials", {
    username: phoneNumber,
    otp,
    redirect: false,
  });

  if (res?.error) {
    throw new Error(res.error);
  }

  return res;
};

export const Logout = async () => {
  await signOut();
};
