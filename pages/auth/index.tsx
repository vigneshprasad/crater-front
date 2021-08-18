import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import AuthPage from "@/auth/components/pages/AuthPage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

const Auth: React.FC = () => <AuthPage />;

export default Auth;
