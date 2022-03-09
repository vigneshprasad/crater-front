import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";
import { Creator } from "@/creators/types/creator";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

const CreatorHubStreamTab = dynamic(
  () => import("@/creators/components/objects/CreatorHubStreamTab")
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

export default function CreatorHubStream({
  creator,
  userId,
}: IProps): JSX.Element {
  return (
    <HubPageLayout creator={creator} activeTab="stream">
      <CreatorStreamProvider creatorId={userId}>
        <UpcomingStreamsProvider host={userId}>
          <PastStreamProvider host={userId}>
            <CreatorHubStreamTab />
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </CreatorStreamProvider>
    </HubPageLayout>
  );
}
