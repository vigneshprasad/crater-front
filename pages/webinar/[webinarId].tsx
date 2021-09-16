import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

import dynamic from "next/dynamic";

import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar as WebinarType } from "@/creators/types/community";
import DyteApiClient from "@/dyte/api";
import { DyteParticpant } from "@/dyte/types/dyte";

const WebinarPage = dynamic(
  () => import("@/community/components/pages/WebinarPage"),
  {}
);

interface WebinarPageProps {
  orgId: string;
  webinarId: string;
  webinar: WebinarType;
  dyteParticipant: DyteParticpant | null;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ webinarId: string }>
): Promise<GetServerSidePropsResult<WebinarPageProps>> {
  const webinarId = context.params?.webinarId as string;
  const orgId = process.env.DYTE_ORG_ID as string;
  const [webinar, error] = await WebinarApiClient(context).getWebinar(
    webinarId
  );
  const [dyteParticipant] = await DyteApiClient(context).getDyteParticpant(
    webinarId
  );

  if (error?.response?.status === 404 || !webinar) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      orgId,
      webinarId: webinarId as string,
      webinar,
      dyteParticipant: dyteParticipant || null,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Webinar({
  orgId,
  webinar,
  webinarId,
  dyteParticipant,
}: Props): JSX.Element {
  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description: webinar.topic_detail?.description,
      }}
    >
      <WebinarProvider id={webinarId} initial={webinar}>
        <WebinarPage orgId={orgId} dyteParticipant={dyteParticipant} />
      </WebinarProvider>
    </Page>
  );
}
