import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import STATIC_IMAGES from "public/images";

import dynamic from "next/dynamic";

import { PageRoutes } from "@/common/constants/route.constants";

const LandingPage = dynamic(
  () => import("@/auth/components/pages/LandingPage")
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    return {
      redirect: {
        destination: PageRoutes.category("design"),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Landing(): JSX.Element {
  return (
    <LandingPage
      primaryHeading="Design & Art Creators"
      secondaryHeading="Watch live streams on UI/UX Design, Art, Sketching and more on Crater today."
      image={STATIC_IMAGES.ImageDesignLandingPage}
      redirectTo={PageRoutes.category("design")}
    />
  );
}
