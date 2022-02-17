import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Box, Card, Flex, Shimmer, Text } from "@/common/components/atoms";
import ProgressBar from "@/common/components/objects/ProgressBar";
import { TrafficSourceType } from "@/creators/types/creator";

import TrafficSourceTypeChart from "../TrafficSourceTypeChart";

interface IProps {
  trafficSourceTypes?: TrafficSourceType[];
}

export default function TrafficSourceTypeBox({
  trafficSourceTypes,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const total = useMemo(() => {
    if (trafficSourceTypes !== undefined && trafficSourceTypes.length > 0) {
      return trafficSourceTypes.reduce((n, { count }) => n + count, 0);
    }
  }, [trafficSourceTypes]);

  if (trafficSourceTypes === undefined || total === undefined) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }}>
      <Text pb={space.xs} textStyle="headline5">
        Traffic Source Types
      </Text>

      <Box h={240} display="flex" justifyContent="center">
        <TrafficSourceTypeChart trafficSourceTypes={trafficSourceTypes} />
      </Box>

      <Box w="80%" m="0 auto">
        {trafficSourceTypes.map((obj) => {
          const percent = ((obj.count / total) * 100).toFixed(2);
          return (
            <Flex
              my={space.xxs}
              justifyContent="space-around"
              key={obj.source_name}
            >
              <Text w="20%">{obj.source_name}</Text>
              <Text textStyle="caption" color={colors.slate}>
                {percent}%
              </Text>
              <ProgressBar percent={percent} />
              <Text>{obj.count}</Text>
            </Flex>
          );
        })}
      </Box>
    </Card>
  );
}
