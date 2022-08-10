import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Flex, Button } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import usePastStreams from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";

import CategoriesList from "../CategoriesList";
import PastStreamsList from "../PastStreamsList/v2";

export default function CategoryFilteredPastList(): JSX.Element {
  const { streamCategories } = useStreamCategories();
  const { category } = usePastStreams();
  const { space } = useTheme();
  const router = useRouter();

  const filterQuery = router.query.pastCategory as string | undefined;

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
                  pastCategory: cat.pk,
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
        <PastStreamsList />
      </Flex>
    </>
  );
}
