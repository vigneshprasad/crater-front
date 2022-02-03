import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout";
import { CreatorFollowerProvider } from "@/creators/context/CreatorFollowerContext";
import { Creator } from "@/creators/types/creator";

const CreatorFollowersTab = dynamic(
  () => import("@/creators/components/objects/CreatorFollowersTab")
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

export default function CreatorHubFaq({
  creator,
  userId,
}: IProps): JSX.Element {
  return (
    <HubPageLayout activeTab="club_members" creator={creator}>
      <CreatorFollowerProvider userId={userId}>
        <CreatorFollowersTab />
      </CreatorFollowerProvider>
    </HubPageLayout>
  );
}
