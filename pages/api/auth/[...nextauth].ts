import { API_URL_CONSTANTS } from "lib/constants/url.constants";
import fetcher from "lib/utils/fetcher";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { CallbacksOptions, NextAuthOptions, User } from "next-auth";
import Providers, { AppProviders } from "next-auth/providers";

export const CREDENTIAL_AUTH_TYPE = {
  phoneLogin: "PHONE_LOGIN",
  phoneSignup: "PHONE_SIGNUP",
};

const providers: AppProviders = [
  Providers.Credentials({
    name: CREDENTIAL_AUTH_TYPE.phoneLogin,
    credentials: {
      phoneNUmber: {
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter Phone Number",
      },
      otp: {
        label: "OTP",
        type: "text",
        placeholder: "Enter OTP",
      },
    },
    async authorize(credentials) {
      try {
        const res = await fetcher<{ user?: User; token?: string }>(
          API_URL_CONSTANTS.auth.phoneLogin,
          {
            method: "POST",
            data: credentials,
          }
        );

        const { user, token } = res.data;
        if (user && token) {
          return {
            ...user,
            apiToken: token,
          };
        }
        return null;
      } catch (err) {
        const error = JSON.stringify(err.response.data);
        throw new Error(error);
      }
    },
  }),
];

const callbacks: CallbacksOptions = {
  async jwt(token, user) {
    if (user) {
      return {
        ...token,
        user,
      };
    }
    return token;
  },
  async session(session, user) {
    const res = {
      ...session,
      user: user.user,
    };
    return res;
  },
};

const options: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    error: "/auth",
  },
};

const auth: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default auth;
