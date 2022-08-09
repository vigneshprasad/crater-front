import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Button, Flex, Span } from "@/common/components/atoms";
import StyledSubHeading from "@/common/components/objects/StyledSubHeading";
import { PageRoutes } from "@/common/constants/route.constants";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import CategoriesList from "../CategoriesList";
import PastStreamsList from "../PastStreamsList/v2";
import UpcomingStreamsList from "../UpcomingStreamsList";

export default function CategoryFilteredUpcomingList(): JSX.Element {
  const { space, colors } = useTheme();
  const { category } = useUpcomingStreams();
  const router = useRouter();
  const { streamCategories } = useStreamCategories();

  const filterQuery = router.query.upcomingCategory as string | undefined;
  return (
    <>
      <Box px={space.xxs} mb={space.xxxs}>
        <CategoriesList
          categories={streamCategories}
          selectedCategory={category}
          onClickCategory={(cat) => {
            if (cat.pk === category) {
              router.push("/", undefined, { shallow: true });
              return;
            }

            router.push(
              {
                pathname: "/",
                query: {
                  upcomingCategory: cat.pk,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
      </Box>

      <Flex flexDirection="column">
        {filterQuery && (
          <Button
            textAlign="right"
            paddingRight={space.xs}
            text="View All"
            variant="text-button"
            color="white"
            onClick={() => {
              const slug =
                category && streamCategories
                  ? streamCategories[category - 1].slug
                  : "";
              router.push(PageRoutes.category(slug));
            }}
          />
        )}
        <UpcomingStreamsList />
      </Flex>

      {filterQuery && (
        <PastStreamProvider
          categoryFilter={filterQuery ? parseInt(filterQuery) : undefined}
        >
          <Box px={space.xxs} mb={space.xxs}>
            <StyledSubHeading
              label={
                <>
                  <Span color={colors.accentLight}>Past streams</Span> in this
                  category
                </>
              }
            />
            <Box h={space.xxs} />
            <PastStreamsList />
          </Box>
        </PastStreamProvider>
      )}
    </>
  );
}
