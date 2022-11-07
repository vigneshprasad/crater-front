import { useRouter } from "next/router";

import useStreamCategories from "@/stream/context/StreamCategoryContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import CategoriesList from "../CategoriesList";
import UpcomingStreamsList from "../UpcomingStreamsList";

export default function CategoryFilteredUpcomingList(): JSX.Element {
  const { categorySlug } = useUpcomingStreams();
  const router = useRouter();
  const { streamCategories } = useStreamCategories();

  return (
    <>
      <CategoriesList
        categories={streamCategories}
        selectedCategory={categorySlug}
        onClickCategory={(cat) => {
          if (cat.slug === categorySlug) {
            router.push("/", undefined, { shallow: true });
            return;
          }

          router.push(
            {
              pathname: "/",
              query: {
                upcoming: cat.slug,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      />

      <UpcomingStreamsList />

      {/* <Flex flexDirection="column"> */}
      {/* {filterQuery && (
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
        )} */}

      {/* </Flex> */}

      {/* {filterQuery && (
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
      )} */}
    </>
  );
}
