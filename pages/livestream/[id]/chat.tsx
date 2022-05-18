import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ThemeProvider } from "styled-components";

import Page from "@/common/components/objects/Page";
import { theme } from "@/common/theme";
import WebinarApiClient from "@/community/api";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import StreamChat from "@/stream/components/objects/StreamChat";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface StreamChatPageProps {
  webinar: Webinar;
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  StreamChatPageProps,
  IParams
> = async ({ params, req }) => {
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient({ req }).getWebinar(id);

  if (!webinar) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      webinar,
      id,
    },
  };
};

export default function StreamChatPage({
  webinar,
  id,
}: StreamChatPageProps): JSX.Element {
  return (
    <Page
      seo={{
        title: `${webinar.topic_detail.name} - Chat`,
        description: webinar.topic_detail?.description,
      }}
    >
      <ThemeProvider theme={theme}>
        <WebinarProvider initial={webinar} id={id}>
          <ChatColorModeProvider>
            <StreamChat minHeight="100%" showPopup={false} stream={webinar} />
          </ChatColorModeProvider>
        </WebinarProvider>
      </ThemeProvider>
    </Page>
  );
}
