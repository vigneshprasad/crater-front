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
            <Grid
              gridAutoFlow="column"
              gridTemplateColumns="130px 1fr"
              gridGap={space.xxs}
              alignItems="center"
            >
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
          );
        },
      },
      {
        label: "RSVP",
        key: "rsvp",
        valueGetter: (obj) => {
          return (
            <Box>
              <Text>{obj.rsvp_count}</Text>
            </Box>
          );
        },
      },
      {
        label: "Messages",
        key: "messages",
        valueGetter: (obj) => {
          return (
            <Box>
              <Text>{obj.messages_count}</Text>
            </Box>
          );
        },
      },
    ];
  }, [space, colors]);

  if (topStreams === undefined || topStreams === null) {
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
