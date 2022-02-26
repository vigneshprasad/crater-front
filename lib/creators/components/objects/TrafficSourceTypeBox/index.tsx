import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Box,
  Card,
  CardProps,
  Flex,
  Grid,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import ProgressBar from "@/common/components/objects/ProgressBar";
import { TrafficSourceType } from "@/creators/types/creator";

import TrafficSourceTypeChart from "../TrafficSourceTypeChart";

interface IProps extends CardProps {
  trafficSourceTypes?: TrafficSourceType[];
}

export default function TrafficSourceTypeBox({
  trafficSourceTypes,
  ...rest
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
    <Card containerProps={{ px: space.xs, py: space.xs }} {...rest}>
      <Text pb={space.xs} textStyle="headline5">
        Traffic Source Types
      </Text>

      <TrafficSourceTypeChart trafficSourceTypes={trafficSourceTypes} />

      <Box>
        {trafficSourceTypes.slice(0, 3).map((obj) => {
          const percent = parseFloat(((obj.count / total) * 100).toFixed(2));
          return (
            <Grid
              my={space.xxs}
              gridAutoFlow="column"
              gridTemplateColumns="repeat(3, 1fr)"
              gridGap={space.xxxs}
              key={obj.source_name}
            >
              <Text justifySelf="start">{obj.source_name}</Text>
              <Flex flexDirection="row" gridGap={space.xxxs}>
                <Text textStyle="caption" color={colors.slate}>
                  {percent}%
                </Text>
                <ProgressBar percent={percent} />
              </Flex>
              <Text justifySelf="center">{obj.count}</Text>
            </Grid>
          );
        })}
      </Box>
    </Card>
  );
}
