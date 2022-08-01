import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { Creator } from "@/creators/types/creator";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

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
  return (
    <HubPageLayout creator={creator} activeTab="journey">
      <PastStreamProvider host={creator?.user} pageSize={5}>
        <CreatorHubJourneyTab creator={creator} />
      </PastStreamProvider>
    </HubPageLayout>
  );
}
