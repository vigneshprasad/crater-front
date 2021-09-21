import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import { HOST_URL } from "@/common/constants/url.constants";
import WebinarApiClient from "@/community/api";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { WebinarRequestProvider } from "@/community/context/WebinarRequestContext";
import { GroupRequest, Webinar } from "@/creators/types/community";

const SessionPage = dynamic(
  () => import("@/community/components/pages/SessionPage")
);

export const getServerSideProps: GetServerSideProps<{
  id: string;
  webinar: Webinar;
  fullUrl: string;
  groupRequest?: GroupRequest;
}> = async (context) => {
  const { resolvedUrl } = context;
  const id = context.query.roomId as string;
  const fullUrl = `${HOST_URL}${resolvedUrl}`;

  const [webinar, error] = await WebinarApiClient(context).getWebinar(id);
  const [groupRequest] = await WebinarApiClient(context).getWebinarRequest(id);

  if ((error && error.response?.status === 404) || !webinar) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id, webinar, fullUrl, ...(groupRequest && { groupRequest }) },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function AudioRoom({
  webinar,
  id,
  fullUrl,
  groupRequest,
}: Props): JSX.Element {
  return (
    <WebinarProvider id={id} initial={webinar}>
      <WebinarRequestProvider groupId={id} initial={groupRequest}>
        <SessionPage url={fullUrl} id={id} />
      </WebinarRequestProvider>
    </WebinarProvider>
  );
}

AudioRoom.auth = false;
