import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;

  return {
    redirect: {
      destination: `/creator/${id}/club`,
      permanent: true,
    },
  };
};

export default function Index(): null {
  return null;
}
