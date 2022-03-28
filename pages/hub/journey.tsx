import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box } from "@/common/components/atoms";
import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout";
import { Creator } from "@/creators/types/creator";

const CreatorHubJourneyTab = dynamic(
  () => import("@/creators/components/objects/CreatorHubJourneyTab")
);

interface PageProps {
  creator: Creator | null;
  userId?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    const data = await getHubServerSideProps(context);
    return {
      props: {
        ...data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/join",
      },
      props: {} as PageProps,
    };
  }
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorHubJourney({ creator }: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <HubPageLayout creator={creator} activeTab="journey">
      {/* <Box overflowY="auto" px={[space.xxs, space.s]} py={space.s}> */}
      <CreatorHubJourneyTab />
      {/* </Box> */}
    </HubPageLayout>
  );
}
