import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import { CreatorFollowerProvider } from "@/creators/context/CreatorFollowerContext";
import { Creator } from "@/creators/types/creator";

const HubClubMembersTab = dynamic(
  () => import("@/creators/components/objects/HubClubMembersTab")
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
    const { creator } = data;

    if (!creator?.show_analytics && !creator?.show_club_members) {
      return {
        redirect: {
          destination: PageRoutes.hub(),
        },
        props: {} as PageProps,
      };
    }

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
    <HubPageLayout creator={creator} activeTab="club_members">
      <CreatorFollowerProvider userId={userId}>
        <HubClubMembersTab />
      </CreatorFollowerProvider>
    </HubPageLayout>
  );
}
