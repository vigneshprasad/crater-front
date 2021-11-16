import { GetServerSideProps } from "next";

import { PageRoutes } from "@/common/constants/route.constants";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string;

  return {
    redirect: {
      destination: PageRoutes.creatorProfile(slug, "streams"),
      permanent: true,
    },
  };
};

export default function Index(): null {
  return null;
}
