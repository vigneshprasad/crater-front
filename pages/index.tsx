import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      permanent: true,
      destination: "/home/clubs",
    },
  };
};
const Index: NextPage = () => null;

export default Index;
