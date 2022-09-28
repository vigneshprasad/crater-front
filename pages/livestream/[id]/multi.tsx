import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import Page from "@/common/components/objects/Page";
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
}

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async (
  props
) => {
  const { params } = props;
  console.log(params);
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient().getWebinar(id);
  const [multistream] = await MultiStreamApiClient().getSquadForGroup(id);

  if (!webinar) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: parseInt(id, 10),
      multistream: multistream ? multistream : null,
      webinar,
    },
  };
};

export default function MultiStreamPage({
  webinar,
  multistream,
  id,
}: IProps): JSX.Element {
  const { topic_detail } = webinar;
  console.log(multistream);
  return (
    <Page
      seo={{ title: topic_detail.name, description: topic_detail.description }}
    >
      <LiveStreamPage
        stream={webinar}
        multiStreamMode={true}
        multistream={multistream ? multistream : undefined}
        streamId={id}
      />
    </Page>
  );
}
