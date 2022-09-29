import { NextApiHandler } from "next";
import NextAuth, { CallbacksOptions, NextAuthOptions, User } from "next-auth";
import { SignInProvider } from "next-auth/client";
import Providers, { AppProviders } from "next-auth/providers";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

export type CredentialProviderId =
  | "phone-auth"
  | "user-update"
  | SignInProvider;

const providers: AppProviders = [
  Providers.Credentials({
    id: "phone-auth",
    name: "PhoneAuth",
    credentials: {
      phoneNumber: {
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter Phone Number",
      },
      otp: {
        label: "OTP",
        type: "text",
        placeholder: "Enter OTP",
      },
      utm_source: {
        type: "text",
      },
      utm_campaign: {
        type: "text",
      },
      utm_medium: {
        type: "text",
      },
      name: {
        type: "text",
      },
    },
    async authorize(credentials) {
      try {
        const res = await API().post(
          API_URL_CONSTANTS.auth.phoneLogin,
          credentials
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
        throw new Error(err as string);
      }
    },
  }),
  Providers.Credentials({
    id: "user-update",
    name: "User Token Update",
    credentials: {
      user: {
        label: "User",
        type: "text",
        placeholder: "Enter User JSON string",
      },
      token: {
        label: "Api Token",
        type: "text",
        placeholder: "Enter Api Token",
      },
    },
    async authorize(credentials) {
      const { user: userJson, token } = credentials;

      try {
        const user = JSON.parse(userJson) as User;
        return {
          ...user,
          apiToken: token,
        };
      } catch (err) {
        throw new Error(err as string);
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
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      // eslint-disable-next-line no-console
      console.error(code, metadata);
    },
    warn(code) {
      // eslint-disable-next-line no-console
      console.warn(code);
    },
    debug(code, metadata) {
      // eslint-disable-next-line no-console
      console.debug(code, metadata);
    },
  },
};

const Auth: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default Auth;
