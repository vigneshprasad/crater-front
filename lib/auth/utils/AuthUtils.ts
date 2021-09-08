import { signin, SignInResponse, signOut } from "next-auth/client";

export async function Login(
  phoneNumber: string,
  otp: string
): Promise<SignInResponse | undefined> {
  const res = await signin("credentials", {
    username: phoneNumber,
    otp,
    redirect: false,
  });

  if (res?.error) {
    throw new Error(res.error);
  }

  return res;
}

export async function Logout(): Promise<void> {
  await signOut();
}
