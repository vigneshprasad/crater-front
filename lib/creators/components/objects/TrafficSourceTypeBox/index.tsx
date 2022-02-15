import { useTheme } from "styled-components";

import { Box, Card, Shimmer, Text } from "@/common/components/atoms";
import { TrafficSourceType } from "@/creators/types/creator";

import TrafficSourceTypeChart from "../TrafficSourceTypeChart";

interface IProps {
  trafficSourceTypes?: TrafficSourceType[];
}

export default function TrafficSourceTypeBox({
  trafficSourceTypes,
}: IProps): JSX.Element {
  const { space } = useTheme();

  if (trafficSourceTypes === undefined) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }}>
      <Text pb={space.xs} textStyle="headline5">
        Traffic Source Types
      </Text>

      <Box h={240}>
        <TrafficSourceTypeChart trafficSourceTypes={trafficSourceTypes} />
      </Box>

      {/* <Box m="0">
        {trafficSourceTypes.map((obj) => {
          return (
            <Flex
              flexDirection="row"
              key={obj.source_name}
              justifyContent="space-between"
            >
              <Text>{obj.source_name}</Text>
              <Text>{obj.count}</Text>
            </Flex>
          );
        })}
      </Box> */}
    </Card>
  );
}
