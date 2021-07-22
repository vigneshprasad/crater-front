import AuthPage from "lib/modules/auth/components/pages/AuthPage";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session !== null) {
    return {
      redirect: {
        permanent: true,
        destination: "/home",
      },
    };
  }

  return {
    props: {},
  };
};

const Auth: React.FC = () => {
  return <AuthPage />;
};

export default Auth;
