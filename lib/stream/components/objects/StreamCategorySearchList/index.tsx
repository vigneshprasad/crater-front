import { useTheme } from "styled-components";

import { Box, Flex, Text, Spinner, Link } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import useGlobalSearch from "@/common/context/GlobalSearchContext";

export default function StreamCategorySearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { streamCategories } = useGlobalSearch();

  return (
    <Box>
      {(() => {
        if (streamCategories === undefined) {
          return (
            <Flex
              flexDirection="column"
              gridGap={space.xxxs}
              alignItems="center"
            >
              <Spinner size={24} strokeColor={colors.textPrimary} />
              <Text textStyle="captionLarge">Searching...</Text>
            </Flex>
          );
        }

        if (streamCategories.length === 0) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return streamCategories.map((category) => (
          <Link href={PageRoutes.category(category.slug)} key={category.pk}>
            <Box
              mb={10}
              pb={10}
              borderBottom={`1px solid ${colors.primaryLight}`}
            >
              <Text textStyle="captionLarge">{category.name}</Text>
            </Box>
          </Link>
        ));
      })()}
    </Box>
  );
}
