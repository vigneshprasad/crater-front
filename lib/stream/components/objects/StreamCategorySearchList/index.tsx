import { useTheme } from "styled-components";

import { Box, Flex, Text, Spinner, Link } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import useStreamCategorySearchList from "@/stream/context/StreamCategorySearchContext";

export default function StreamCategorySearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { categories, isValidating } = useStreamCategorySearchList();

  return (
    <Box>
      {(() => {
        if (isValidating && !categories) {
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

        if (categories?.length === 0) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return categories?.map((category) => (
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
