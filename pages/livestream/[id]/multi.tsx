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
import { MultiStream, PrivacyType, Webinar } from "@/community/types/community";

const LiveStreamPage = dynamic(
  () => import("@/stream/components/page/LiveStreamPage/v2")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IProps {
  webinar: Webinar;
  multistream: MultiStream | null;
  id: number;
  orgId: string;
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async (
  props
) => {
  const { params } = props;
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient().getWebinar(id);
  const [multistream] = await MultiStreamApiClient().getSquadForGroup(id);
  const session = await getSession(props);

  if (!webinar) {
    return {
      notFound: true,
    };
  }

  const orgId = process.env.DYTE_ORG_ID as string;
  const isHost = session?.user?.pk === webinar.host_detail.pk;
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

  if (isHost || !multistream) {
    return {
      redirect: {
        destination: `/livestream/${id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: parseInt(id, 10),
      multistream: multistream ? multistream : null,
      webinar,
      orgId,
      session,
    },
  };
};

export default function MultiStreamPage({
  webinar,
  multistream,
  orgId,
}: IProps): JSX.Element {
  const { topic_detail } = webinar;
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  return (
    <Page
      seo={{ title: topic_detail.name, description: topic_detail.description }}
    >
      <LiveStreamPage
        orgId={orgId}
        onClickMultiStreamToggle={() =>
          router.push(PageRoutes.stream(id), undefined, { shallow: true })
        }
        stream={webinar}
        multiStreamMode={true}
        multistream={multistream ? multistream : undefined}
        streamId={id}
      />
    </Page>
  );
}
