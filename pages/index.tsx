import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    return {
      redirect: {
        permanent: true,
        destination: "/home",
      },
    };
  }
  return {
    redirect: {
      permanent: true,
      destination: "/auth",
    },
  };
};
const Index: NextPage = () => null;

export default Index;
