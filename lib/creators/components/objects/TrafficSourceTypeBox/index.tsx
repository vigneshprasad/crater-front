import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Box, Flex, Grid, Shimmer, Text } from "@/common/components/atoms";
import { TrafficSourceType } from "@/creators/types/creator";

import TrafficSourceTypeChart from "../TrafficSourceTypeChart";

interface IProps {
  trafficSourceTypes?: TrafficSourceType[];
}

const COLORS = ["#D5BBFF", "#B2FF8E", "#FA8C8C", "#8CF1FF"];

export default function TrafficSourceTypeBox({
  trafficSourceTypes,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  // const total = useMemo(() => {
  //   if (trafficSourceTypes && trafficSourceTypes.length > 0) {
  //     return trafficSourceTypes.reduce((n, { count }) => n + count, 0);
  //   }
  // }, [trafficSourceTypes]);

  const sources = useMemo(() => {
    if (trafficSourceTypes && trafficSourceTypes.length > 0) {
      return trafficSourceTypes.map((obj, index) => {
        obj.color = COLORS[index % COLORS.length];
        return obj;
      });
    }

    return [];
  }, [trafficSourceTypes]);

  return (
    <Box bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Text
        p={`${space.xs}px 24px ${space.xs}px ${space.xxs}px`}
        textStyle="label"
        color={colors.accentLight}
        bg={colors.primaryLight}
        textTransform="uppercase"
        borderRadius={`${radii.xxxxs}px ${radii.xxxxs}px 0px 0px`}
      >
        Traffic Sources
      </Text>

      {(() => {
        if (!trafficSourceTypes) {
          return <Shimmer w="100%" h={300} />;
        }

        return (
          <Grid
            gridAutoFlow="column"
            gridTemplateColumns="1fr 1fr"
            gridGap={32}
            alignItems="center"
          >
            <TrafficSourceTypeChart trafficSourceTypes={sources} />
            <Box>
              {sources.length > 0 ? (
                sources.map((obj, index) => (
                  <Flex
                    pb={space.xxxs}
                    flexDirection="row"
                    gridGap={space.xxxs}
                    key={index}
                  >
                    <Box
                      w={15}
                      h={15}
                      borderRadius={radii.xxxxs}
                      bg={obj.color}
                    />
                    <Text textStyle="body" fontWeight={600}>
                      {obj.source_name}
                    </Text>
                  </Flex>
                ))
              ) : (
                <Text textStyle="body" fontWeight={600}>
                  No data to show yet
                </Text>
              )}
            </Box>
          </Grid>
        );
      })()}
    </Box>
  );
}
