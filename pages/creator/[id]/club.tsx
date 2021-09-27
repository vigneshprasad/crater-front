import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";

import { NetworkListProvider } from "@/community/context/NetworkListContext";
import { Webinar } from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorStreamsTab from "@/creators/components/objects/CreatorStreamsTab";
import CreatorPage from "@/creators/components/page/CreatorPage";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  id: string;
  creator: Creator;
  streams: Webinar[];
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

  return {
    props: {
      id,
      creator,
      streams: streams ?? [],
    },
  };
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorStreams({
  creator,
  id,
  streams,
}: IProps): JSX.Element {
  return (
    <CreatorPageLayout creator={creator} id={id}>
      <CreatorPage selectedTab="club">
        <CreatorStreamProvider creatorId={creator.user} live={streams}>
          <NetworkListProvider>
            <CreatorStreamsTab />
          </NetworkListProvider>
        </CreatorStreamProvider>
      </CreatorPage>
    </CreatorPageLayout>
  );
}
