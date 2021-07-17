import { signIn, SignInOptions, SignInResponse } from "next-auth/client";

interface ISigninCreds extends SignInOptions {
  phonenumber: string;
  otp: string;
}

const authSignin = async (
  credentials: ISigninCreds
): Promise<SignInResponse | undefined> => {
  const res = await signIn("credentials", {
    ...credentials,
    redirect: false,
  });

  if (res?.error) {
    throw new Error(res.error);
  }

  return res;
};

export default authSignin;
