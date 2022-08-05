import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { Creator } from "@/creators/types/creator";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

const HubPastStreamsTab = dynamic(
  () => import("@/creators/components/objects/HubPastStreamsTab")
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

export default function CreatorHubPastStreams({
  creator,
  userId,
}: IProps): JSX.Element {
  return (
    <HubPageLayout creator={creator} activeTab="past">
      <PastStreamProvider host={userId}>
        <HubPastStreamsTab creator={creator} />
      </PastStreamProvider>
    </HubPageLayout>
  );
}
