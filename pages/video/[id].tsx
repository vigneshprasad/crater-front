import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeoProps } from "next-seo";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import StreamApiClient from "@/stream/api";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { StreamRecordingProvider } from "@/stream/context/StreamRecordingContext";

const StreamPlayerPage = dynamic(
  () => import("@/stream/components/page/StreamPlayerPage")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface StreamPageProps {
  id: string;
  webinar: Webinar;
  recordingId: number;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [data] = await StreamApiClient().getPastStreams(50);

  if (!data?.results) return { paths: [], fallback: "blocking" };

  const paths = data.results.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<StreamPageProps, IParams> = async ({
  params,
}) => {
  const { id } = params as IParams;
  const [webinar, error] = await WebinarApiClient().getWebinar(id);

  if (error || !webinar || !webinar.recording_details) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      id,
      webinar,
      recordingId: webinar.recording_details.id,
    },
    revalidate: 10,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function StreamPage({
  id,
  webinar,
  recordingId,
}: Props): JSX.Element {
  const seo: NextSeoProps = {
    title: `Crater - ${webinar.topic_detail?.name}`,
    description: webinar.topic_detail?.description,
  };
  return (
    <Page seo={seo}>
      <WebinarProvider id={id} initial={webinar}>
        <StreamRecordingProvider id={recordingId}>
          <PastStreamProvider>
            <StreamPlayerPage />
          </PastStreamProvider>
        </StreamRecordingProvider>
      </WebinarProvider>
    </Page>
  );
}
