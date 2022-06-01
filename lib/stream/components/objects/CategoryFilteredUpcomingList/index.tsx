import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Span } from "@/common/components/atoms";
import StyledSubHeading from "@/common/components/objects/StyledSubHeading";
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

  const filterQuery = router.query.upcomigCategory as string | undefined;
  return (
    <>
      <Box px={space.xxs} mb={space.xxs}>
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
                  upcomigCategory: cat.pk,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
      </Box>

      <UpcomingStreamsList />

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

            <PastStreamsList />
          </Box>
        </PastStreamProvider>
      )}
    </>
  );
}
