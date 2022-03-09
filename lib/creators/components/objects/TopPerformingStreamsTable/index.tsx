import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Box,
  Card,
  Grid,
  Image,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { TopStreams } from "@/creators/types/stream";

interface IProps {
  topStreams?: TopStreams[];
}

export default function TopPerformingStreamsTable({
  topStreams,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const columns = useMemo<Column<TopStreams>[]>(() => {
    return [
      {
        label: "Stream",
        key: "stream",
        valueGetter: (obj) => {
          const startTime = DateTime.parse_with_milliseconds(obj.start);

          return (
            <a
              href={PageRoutes.streamVideo(obj.id)}
              target="_blank"
              rel="noreferrer"
            >
              <Grid
                gridAutoFlow="column"
                gridTemplateColumns="max-content 80px max-content"
                gridGap={space.xxs}
                alignItems="center"
              >
                <Text>
                  {topStreams &&
                    topStreams?.findIndex((x) => x.id === obj.id) + 1}
                </Text>
                <Box>
                  {obj.topic_image && (
                    <Image
                      objectFit="cover"
                      layout="fill"
                      src={obj.topic_image}
                      alt={obj.topic_title}
                    />
                  )}
                </Box>

                <Box>
                  <Text textAlign="start">{obj.topic_title}</Text>
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
      // {
      //   label: "RSVP",
      //   key: "rsvp",
      //   valueGetter: (obj) => obj.rsvp_count,
      // },
      // {
      //   label: "Messages",
      //   key: "messages",
      //   valueGetter: (obj) => obj.messages_count,
      // },
    ];
  }, [space, colors, topStreams]);

  if (topStreams === undefined) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }}>
      <Text pb={space.xs} textStyle="headline5">
        Your Top Performing Streams
      </Text>

      <DataTable columns={columns} data={topStreams} />
    </Card>
  );
}
