import { useState } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Box } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import Footer from "@/common/components/objects/Footer";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import { PastStreamListItem, Webinar } from "@/community/types/community";
import TopCreatorsList from "@/creators/components/objects/TopCreatorsList";
import { CreatorRank } from "@/creators/types/creator";
import { StreamCategory } from "@/creators/types/stream";
import StreamApiClient from "@/stream/api";
import usePastStreamsWithRecording from "@/stream/context/PastStreamsWithRecordingContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import CategoriesList from "../../objects/CategoriesList";
import CategoryVideoSection from "../../objects/CategoryVideoSection";
import PastStreamsList from "../../objects/PastStreamsList/v2";
import UpcomingStreamsList from "../../objects/UpcomingStreamsList";
import Container from "./container";

type IProps = {
  id: number;
  slug: string;
  streamCategory: StreamCategory;
  upcomingStreams?: PageResponse<Webinar>;
  pastStreams?: PageResponse<PastStreamListItem>;
  creators?: PageResponse<CreatorRank>;
};

export function Content({ slug, streamCategory }: IProps): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const { space, colors } = useTheme();
  const { streamCategories } = useStreamCategories();
  const { category: currentCategory } = useUpcomingStreams();
  const [loading, setLoading] = useState(false);
  const { streams: pastStreamsWithRecording } = usePastStreamsWithRecording();

  const { data: categoryFollower, mutate: categoryFollowerMutate } = useSWR<
    Partial<StreamCategory>
  >(user ? API_URL_CONSTANTS.user.isCategoryFollower(slug) : null);

  const followCategory = async (): Promise<void> => {
    if (!user) {
      openModal();
    }

    if (slug) {
      setLoading(true);

      const [response] = await StreamApiClient().followStreamCategory(slug);

      if (response && response.followed) {
        categoryFollowerMutate({ is_follower: true });
      }

      setLoading(false);
    }
  };

  const unfollowCategory = async (): Promise<void> => {
    if (slug) {
      setLoading(true);
      const [response] = await StreamApiClient().unfollowStreamCategory(slug);

      if (response && !response.followed) {
        categoryFollowerMutate({ is_follower: false });
      }

      setLoading(false);
    }
  };

  console.log(categoryFollower);

  return (
    <BaseLayout aside={<AsideNav />} overflowY="scroll">
      <Box px={[0, space.xxs]} pb={32}>
        <CategoryVideoSection
          streamCategory={streamCategory}
          pastStreams={pastStreamsWithRecording}
          categoryFollower={categoryFollower}
          loading={loading}
          followCategory={followCategory}
          unfollowCategory={unfollowCategory}
        />

        <Box px={[space.xxxs, 0]} pt={28}>
          <CategoriesList
            categories={streamCategories}
            selectedCategory={currentCategory}
            onClickCategory={(cat) => {
              if (cat.pk === currentCategory) {
                return;
              }

              router.push(PageRoutes.category(cat.slug));
            }}
          />
        </Box>

        <StyledHeadingDivider
          label="Upcoming Streams"
          mx={[space.xs, space.xxs]}
          mt={[28, space.s]}
        />
        <UpcomingStreamsList />

        <StyledHeadingDivider
          label="Top Creators"
          mx={[space.xs, space.xxs]}
          mt={[32, space.s]}
        />
        <TopCreatorsList />

        <StyledHeadingDivider
          label="Past Streams"
          mx={[space.xs, space.xxs]}
          mt={[32, space.s]}
        />
        <PastStreamsList />
      </Box>

      <Box
        px={[space.xxs, space.s]}
        py={[space.xxs, space.s]}
        backgroundColor={colors.primaryDark}
      >
        <Footer />
      </Box>
    </BaseLayout>
  );
}

export default function StreamCategoryPage({
  id,
  slug,
  streamCategory,
  ...rest
}: IProps): JSX.Element {
  return (
    <Container id={id} {...rest}>
      <Content id={id} slug={slug} streamCategory={streamCategory} />
    </Container>
  );
}
