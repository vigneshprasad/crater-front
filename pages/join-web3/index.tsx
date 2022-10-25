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
        destination: PageRoutes.category("web-3"),
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
      primaryHeading="Web 3.0 Creators"
      secondaryHeading="Watch live streams on Web 3.0, Crypto Trading, Blockchain and more on Crater today."
      image={STATIC_IMAGES.ImageWeb3LandingPage}
      redirectTo={PageRoutes.category("web-3")}
    />
  );
}
