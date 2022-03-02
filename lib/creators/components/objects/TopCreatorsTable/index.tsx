import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Shimmer,
  Span,
  Text,
} from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
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
                gridTemplateColumns="max-content max-content 1fr"
                gridGap={space.xxs}
                alignItems="center"
                justifyItems="start"
              >
                <Text>
                  {comparativeRankingData?.creator_ranking &&
                    comparativeRankingData?.creator_ranking?.findIndex(
                      (x) => x.pk === obj.pk
                    ) + 1}
                </Text>

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
          const startTime = DateTime.parse_with_milliseconds(obj.stream_date);

          return (
            <a
              href={PageRoutes.streamVideo(obj.stream_id)}
              target="_blank"
              rel="noreferrer"
            >
              <Grid
                gridAutoFlow="column"
                gridTemplateColumns="80px max-content"
                gridGap={space.xxs}
                alignItems="center"
              >
                <a
                  href={PageRoutes.streamVideo(obj.stream_id)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Box>
                    {obj.stream_image && (
                      <Image
                        objectFit="cover"
                        layout="fill"
                        src={obj.stream_image}
                        alt={obj.stream_topic}
                      />
                    )}
                  </Box>
                </a>

                <Box>
                  <Text textAlign="start">{obj.stream_topic}</Text>
                  <Text
                    textAlign="start"
                    textStyle="caption"
                    color={colors.slate}
                  >
                    {startTime.toFormat(DateTime.DEFAULT_FORMAT)}
                  </Text>
                </Box>
              </Grid>
            </a>
          );
        },
      },
    ];
  }, [space, colors, comparativeRankingData]);

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
