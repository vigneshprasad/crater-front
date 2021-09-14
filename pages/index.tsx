import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: "/home/clubs",
    },
  };
};
const Index: NextPage = () => null;

export default Index;
