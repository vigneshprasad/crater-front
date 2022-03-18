import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import Page from "@/common/components/objects/Page";
import TabHeading from "@/common/components/objects/TabHeading";
import { StreamCategory } from "@/creators/types/stream";
import StreamApiClient from "@/stream/api";
import { StreamCategoryProvider } from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

const PastStreamsPage = dynamic(
  () => import("@/stream/components/page/PastStreamsPage")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  streamCategory: StreamCategory;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [streamCategories] = await StreamApiClient().getAllStreamCategories();

  const paths = (streamCategories as StreamCategory[]).map(({ pk }) => ({
    params: { id: pk.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props, IParams> = async ({
  params,
}) => {
  const { id } = params as IParams;
  const [streamCategory] = await StreamApiClient().retrieveStreamCategory(id);

  if (!streamCategory) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      streamCategory,
    },
    revalidate: 10,
  };
};

export default function PastStreams({ streamCategory }: Props): JSX.Element {
  const { space } = useTheme();

  return (
    <Page
      seo={{
        title: "Crater Club: Past Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <BaseLayout aside={<AsideNav activeTab="streams" />} overflowY="auto">
        <Box p={[space.xs, space.s]}>
          <TabHeading>{streamCategory.name}</TabHeading>
        </Box>
        <UpcomingStreamsProvider category={streamCategory.pk}>
          <StreamCategoryProvider>
            <PastStreamsPage streamCategory={streamCategory} />
          </StreamCategoryProvider>
        </UpcomingStreamsProvider>
      </BaseLayout>
    </Page>
  );
}
