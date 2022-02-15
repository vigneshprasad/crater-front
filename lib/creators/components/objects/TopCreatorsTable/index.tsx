import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Card,
  Grid,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import { TopCreators } from "@/creators/types/creator";

interface IProps {
  topCreators?: TopCreators[];
}

export default function TopCreatorsTable({ topCreators }: IProps): JSX.Element {
  const { space } = useTheme();

  const columns = useMemo<Column<TopCreators>[]>(() => {
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

  if (topCreators === undefined || topCreators === null) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }}>
      <Text pb={space.xs} textStyle="headline5">
        Top Performing Creators
      </Text>

      <DataTable columns={columns} data={topCreators} />
    </Card>
  );
}
