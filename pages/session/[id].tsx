import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { WebinarRequestProvider } from "@/community/context/WebinarRequestContext";
import { Webinar } from "@/creators/types/community";

const SessionPage = dynamic(
  () => import("@/community/components/pages/SessionPage")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
  webinar: Webinar;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [webinars] = await WebinarApiClient().getAllWebinar();

  const paths = (webinars as Webinar[]).map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props, IParams> = async ({
  params,
}) => {
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient().getWebinar(id);

  if (!webinar) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      webinar,
    },
    revalidate: 60 * 5,
  };
};

export default function AudioRoom({ webinar, id }: Props): JSX.Element {
  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description:
          webinar.topic_detail?.description ?? webinar.topic_detail?.name,
      }}
    >
      <WebinarProvider id={id} initial={webinar}>
        <WebinarRequestProvider groupId={id}>
          <SessionPage id={id} />
        </WebinarRequestProvider>
      </WebinarProvider>
    </Page>
  );
}

AudioRoom.auth = false;
