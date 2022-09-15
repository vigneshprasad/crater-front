import { useTheme } from "styled-components";

import { Box, Flex, Grid, Text, Spinner } from "@/common/components/atoms";
import useGlobalSearch from "@/common/context/GlobalSearchContext";

import CreatorSearchCard from "../CreatorSearchCard";

export default function CreatorsSearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { creators } = useGlobalSearch();

  return (
    <Box>
      {(() => {
        if (creators === undefined) {
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

        if (creators.length === 0) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return (
          <Grid
            pb={space.xxs}
            gridAutoFlow="row"
            gridTemplateColumns={[
              "repeat(auto-fill, minmax(110px, 1fr))",
              "repeat(auto-fill, minmax(120px, 1fr))",
            ]}
            gridGap={[space.xxs, space.xxxs]}
          >
            {creators.map((creator) => (
              <CreatorSearchCard creator={creator} key={creator.id} />
            ))}
          </Grid>
        );
      })()}
    </Box>
  );
}
