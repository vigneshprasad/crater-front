import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";

import HomePage from "@components/pages/HomePage";

const Home: React.FC = () => {
  useSession();
  return <HomePage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: true,
        destination: "/auth",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
