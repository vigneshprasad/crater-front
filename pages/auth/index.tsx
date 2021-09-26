import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import AuthPage from "@/auth/components/pages/AuthPage";
import { PageRoutes } from "@/common/constants/route.constants";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    return {
      redirect: {
        destination: PageRoutes.home,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Auth(): JSX.Element {
  return <AuthPage />;
}
