import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";

import CreatorApiClient from "@/creators/api";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorStreamsTab from "@/creators/components/objects/CreatorStreamsTab";
import CreatorPage from "@/creators/components/page/CreatorPage";
import { CreatorCommunityProvider } from "@/creators/context/CreatorCommunityContext";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";
import { CommunityMember, Webinar } from "@/creators/types/community";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  id: string;
  creator: Creator;
  streams: Webinar[];
  members: CommunityMember[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
  query,
}) => {
  const id = query.id as string;
  const session = await getSession({ req });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/auth/",
        permanent: false,
      },
    };
  }

  const [creator] = await CreatorApiClient({ req }).getCreator(id);

  if (!creator) {
    return {
      notFound: true,
    };
  }

  const [streams] = await CreatorApiClient({ req }).getCreatorStreams(
    creator.user
  );
  const [members] = await CreatorApiClient({ req }).getCommunityMemebers(
    creator.default_community.id
  );

  return {
    props: {
      id,
      creator,
      streams: streams ?? [],
      members: members ?? [],
    },
  };
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorStreams({
  creator,
  id,
  streams,
  members,
}: IProps): JSX.Element {
  const communityId = creator.default_community.id;
  return (
    <CreatorPageLayout creator={creator} id={id}>
      <CreatorPage selectedTab="club">
        <CreatorStreamProvider creatorId={creator.user} live={streams}>
          <CreatorCommunityProvider members={members} communityId={communityId}>
            <CreatorStreamsTab />
          </CreatorCommunityProvider>
        </CreatorStreamProvider>
      </CreatorPage>
    </CreatorPageLayout>
  );
}
