import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Page from "@/common/components/objects/Page";
import { PageRoutes } from "@/common/constants/route.constants";
import WebinarApiClient from "@/community/api";
import MultiStreamApiClient from "@/community/api/MultiStreamApiClient";
import { MultiStream, Webinar } from "@/community/types/community";

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
}

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async (
  props
) => {
  const { params } = props;
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient().getWebinar(id);
  const [multistream] = await MultiStreamApiClient().getSquadForGroup(id);

  if (!webinar) {
    return {
      notFound: true,
    };
  }
  const orgId = process.env.DYTE_ORG_ID as string;

  return {
    props: {
      id: parseInt(id, 10),
      multistream: multistream ? multistream : null,
      webinar,
      orgId,
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
