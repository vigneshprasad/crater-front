import { GetServerSideProps } from "next";

import { PageRoutes } from "@/common/constants/route.constants";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;

  return {
    redirect: {
      destination: PageRoutes.creatorProfile(id, "club"),
      permanent: true,
    },
  };
};

export default function Index(): null {
  return null;
}
