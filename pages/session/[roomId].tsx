import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";

import dynamic from "next/dynamic";

import API from "@/common/api";
import { API_URL_CONSTANTS, HOST_URL } from "@/common/constants/url.constants";
import CommunityApiClient from "@/community/api";
import { SessionPageProvider } from "@/community/context/SessionPageContext";
import { GroupRequest, Webinar } from "@/creators/types/community";

const SessionPage = dynamic(
  () => import("@/community/components/pages/SessionPage"),
  { ssr: false }
);

export const getServerSideProps: GetServerSideProps<{
  id: string;
  webinar: Webinar;
  fullUrl: string;
  groupRequest?: GroupRequest;
}> = async (context) => {
  const { resolvedUrl } = context;
  const id = context.query.roomId as string;
  const session = await getSession(context);
  const fullUrl = `${HOST_URL}${resolvedUrl}`;
  if (!session?.user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: true,
      },
    };
  }

  try {
    const { data: webinar } = await API(context).get<Webinar>(
      API_URL_CONSTANTS.conversations.retrieveGroup(id)
    );
    const { data: groupRequest } = await CommunityApiClient(
      context
    ).getGroupRequest(id);

    return {
      props: {
        webinar,
        id,
        fullUrl,
        groupRequest,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function AudioRoom({
  webinar,
  id,
  fullUrl,
}: Props): JSX.Element {
  return (
    <SessionPageProvider id={id} initial={webinar}>
      <SessionPage url={fullUrl} />
    </SessionPageProvider>
  );
}
