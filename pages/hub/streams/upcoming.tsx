import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { Creator } from "@/creators/types/creator";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";
import { SortByField } from "@/stream/types/stream";

const HubUpcomingStreamsTab = dynamic(
  () => import("@/creators/components/objects/HubUpcomingStreamsTab")
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

export default function CreatorHubUpcomingStreams({
  creator,
  userId,
}: IProps): JSX.Element {
  return (
    <HubPageLayout creator={creator} activeTab="upcoming">
      <UpcomingStreamsProvider host={userId} sortBy={SortByField.THIS_WEEK}>
        <HubUpcomingStreamsTab creator={creator} />
      </UpcomingStreamsProvider>
    </HubPageLayout>
  );
}
