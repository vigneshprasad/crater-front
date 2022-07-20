import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import Page from "@/common/components/objects/Page";
import { PageResponse } from "@/common/types/api";
import WebinarApiClient from "@/community/api";
import { PastStreamListItem, Webinar } from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import { CreatorRank } from "@/creators/types/creator";
import { StreamCategory } from "@/creators/types/stream";
import StreamApiClient from "@/stream/api";

const StreamCategoryPage = dynamic(
  () => import("@/stream/components/page/StreamCategoryPage")
);

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface StreamCategoryPageProps {
  id: number;
  slug: string;
  streamCategory: StreamCategory;
  upcomingStreams?: PageResponse<Webinar>;
  pastStreams?: PageResponse<PastStreamListItem>;
  creators?: PageResponse<CreatorRank>;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [streamCategories] = await StreamApiClient().getAllStreamCategories(
    false
  );

  const paths = (streamCategories as StreamCategory[]).map(({ slug }) => ({
    params: { slug: slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  StreamCategoryPageProps,
  IParams
> = async ({ params }) => {
  const { slug } = params as IParams;
  const [streamCategory, error] =
    await StreamApiClient().retrieveStreamCategory(slug);

  if (error || !streamCategory) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const [upcomingStreams] = await WebinarApiClient().getAllUpcomingWebinars(
    undefined,
    undefined,
    streamCategory.pk
  );
  const [pastStreams] = await StreamApiClient().getPastStreams(
    undefined,
    streamCategory.pk
  );
  const [creators] = await CreatorApiClient().getCreatorRankList(
    streamCategory.pk
  );

  return {
    props: {
      id: streamCategory.pk,
      slug: slug,
      streamCategory,
      upcomingStreams,
      pastStreams,
      creators,
    },
    revalidate: 10,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function CategoryPage({
  id,
  slug,
  streamCategory,
  upcomingStreams,
  pastStreams,
  creators,
}: Props): JSX.Element {
  return (
    <Page
      seo={{
        title: "Crater Club: Past Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <StreamCategoryPage
        id={id}
        slug={slug}
        streamCategory={streamCategory}
        upcomingStreams={upcomingStreams}
        pastStreams={pastStreams}
        creators={creators}
      />
    </Page>
  );
}
