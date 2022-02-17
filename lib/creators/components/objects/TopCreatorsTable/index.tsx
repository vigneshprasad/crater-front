import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Shimmer,
  Span,
  Text,
} from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import { CreatorRanking, TopCreators } from "@/creators/types/creator";

interface IProps {
  comparativeRankingData?: TopCreators;
}

export default function TopCreatorsTable({
  comparativeRankingData,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const columns = useMemo<Column<CreatorRanking>[]>(() => {
    return [
      {
        label: "Creator",
        key: "creator",
        valueGetter: (obj) => {
          return (
            <Grid
              gridAutoFlow="column"
              gridTemplateColumns="max-content 1fr"
              gridGap={space.xxs}
              alignItems="center"
              justifyItems="start"
            >
              {obj.creator_image && (
                <Avatar
                  size={56}
                  alt={obj.creator_name || ""}
                  image={obj?.creator_image}
                />
              )}

              <Text>{obj.creator_name}</Text>
            </Grid>
          );
        },
      },
      {
        label: "Followers",
        key: "followers",
        valueGetter: (obj) => {
          return (
            <Box>
              <Text>{obj.follower_count}</Text>
            </Box>
          );
        },
      },
      {
        label: "Top Stream",
        key: "topStream",
        valueGetter: (obj) => {
          return (
            <Box>
              <Text>{obj.stream_topic}</Text>
            </Box>
          );
        },
      },
    ];
  }, [space]);

  if (comparativeRankingData === undefined) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }}>
      <Flex pb={space.xs} justifyContent="space-between" alignItems="center">
        <Text textStyle="headline5">Top Performing Creators</Text>
        <Text textStyle="headline6" color={colors.slate}>
          Your Rank:{" "}
          <Span color={colors.accent}>#{comparativeRankingData.rank}</Span>
        </Text>
      </Flex>

      <DataTable
        columns={columns}
        data={comparativeRankingData.creator_ranking}
      />
    </Card>
  );
}
