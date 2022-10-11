import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Page from "@/common/components/objects/Page";
import { PageRoutes } from "@/common/constants/route.constants";
import WebinarApiClient from "@/community/api";
import MultiStreamApiClient from "@/community/api/MultiStreamApiClient";
import {
  MultiStream,
  PrivacyType,
  Webinar as WebinarType,
} from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import { Reward } from "@/tokens/types/token";

const LiveStreamPage = dynamic(
  () => import("@/stream/components/page/LiveStreamPage/v2")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface WebinarPageProps {
  orgId: string;
  id: string;
  webinar: WebinarType;
  rewards: Reward[];
  multistream: MultiStream | null;
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps<
  WebinarPageProps,
  IParams
> = async (props) => {
  const { params } = props;
  const { id } = params as IParams;
  const [webinar, error] = await WebinarApiClient().getWebinar(id);
  const [multistream] = await MultiStreamApiClient().getSquadForGroup(id);
  const session = await getSession(props);

  if (error || !webinar) {
    return {
      notFound: true,
    };
  }

  const user = session?.user;
  if (user && webinar.privacy === PrivacyType.private) {
    const isUserAttendee = webinar.attendees?.indexOf(user.pk) > -1;
    const isUserSpeaker = webinar.speakers?.indexOf(user.pk) > -1;
    if (!isUserAttendee && !isUserSpeaker) {
      return {
        redirect: {
          destination: PageRoutes.session(webinar?.id),
          permanent: false,
        },
      };
    }
  }

  const slug = webinar.host_detail.creator_detail?.slug;
  const [rewards] = await CreatorApiClient().getAllRewards(slug);

  const orgId = process.env.DYTE_ORG_ID as string;
  return {
    props: {
      orgId,
      id,
      webinar,
      rewards: rewards ?? [],
      multistream: multistream ? multistream : null,
      session,
    },
  };
};

export default function WebinarPage({
  webinar,
  multistream,
  orgId,
}: WebinarPageProps): JSX.Element {
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description: webinar.topic_detail?.description,
      }}
    >
      <LiveStreamPage
        orgId={orgId}
        stream={webinar}
        multiStreamMode={false}
        multistream={multistream ? multistream : undefined}
        streamId={id}
        onClickMultiStreamToggle={() =>
          router.push(PageRoutes.multistream(id), undefined, { shallow: true })
        }
      />
    </Page>
  );
}
