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
import { PageRoutes } from "@/common/constants/route.constants";
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
            <a
              href={PageRoutes.creatorProfile(obj.slug)}
              target="_blank"
              rel="noreferrer"
            >
              <Grid
                gridAutoFlow="column"
                gridTemplateColumns="max-content 1fr"
                gridGap={space.xxs}
                alignItems="center"
                justifyItems="start"
              >
                <Avatar size={46} alt={obj.name || ""} image={obj.image} />

                <Text>{obj.name}</Text>
              </Grid>
            </a>
          );
        },
      },
      {
        label: "Top Stream",
        key: "topStream",
        valueGetter: (obj) => {
          return (
            <a
              href={PageRoutes.streamVideo(obj.stream_id)}
              target="_blank"
              rel="noreferrer"
            >
              <Box>
                <Text>{obj.stream_topic}</Text>
              </Box>
            </a>
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
