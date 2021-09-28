import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { NetworkListProvider } from "@/community/context/NetworkListContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar as WebinarType } from "@/community/types/community";
import { Webinar } from "@/community/types/community";
import { DyteWebinarProvider } from "@/dyte/context/DyteWebinarContext";

const DynamicWebinarPage = dynamic(
  () => import("@/community/components/pages/WebinarPage")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface WebinarPageProps {
  orgId: string;
  id: string;
  webinar: WebinarType;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [webinars] = await WebinarApiClient().getAllWebinar();

  const paths = (webinars as Webinar[]).map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<WebinarPageProps, IParams> =
  async ({ params }) => {
    const { id } = params as IParams;
    const [webinar, error] = await WebinarApiClient().getWebinar(id);
    const orgId = process.env.DYTE_ORG_ID as string;

    if (error || !webinar) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        orgId,
        id,
        webinar,
      },
    };
  };

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function WebinarPage({
  orgId,
  webinar,
  id,
}: Props): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth(): Promise<void> {
      const session = await getSession();
      if (session === null) {
        router.replace(`/session/${id}`);
      }
    }

    if (router) {
      checkAuth();
    }
  }, [router, id]);

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description: webinar.topic_detail?.description,
      }}
    >
      <WebinarProvider id={id} initial={webinar}>
        <DyteWebinarProvider id={id}>
          <UpcomingStreamsProvider>
            <NetworkListProvider>
              <DynamicWebinarPage orgId={orgId} id={id} />
            </NetworkListProvider>
          </UpcomingStreamsProvider>
        </DyteWebinarProvider>
      </WebinarProvider>
    </Page>
  );
}
