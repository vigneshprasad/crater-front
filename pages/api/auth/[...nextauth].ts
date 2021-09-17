import { AxiosError } from "axios";
import { NextApiHandler } from "next";
import NextAuth, { CallbacksOptions, NextAuthOptions } from "next-auth";
import Providers, { AppProviders } from "next-auth/providers";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

const providers: AppProviders = [
  Providers.Credentials({
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
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const error = axiosError.response.data;
          throw new Error(JSON.stringify(error));
        }
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
    error: undefined,
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: true,
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
