import { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Flex, Grid, Text } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Creator, CreatorStats } from "@/creators/types/creator";
import {
  MyPastStreamsContext,
  MyPastStreamsProvider,
} from "@/stream/context/MyPastStreamsContext";

import CreatorStatsBox from "../CreatorStatsBox";
import HubPastStreamsList from "../HubPastStreamsList";

type IProps = {
  creator: Creator | null;
  userId?: string;
};

export default function HubPastStreamsTab({
  creator,
  userId,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const { data: creatorStats } = useSWR<CreatorStats[]>(
    API_URL_CONSTANTS.creator.getStats
  );

  return (
    <Box pt={space.xxs} overflow="auto" minWidth={1000}>
      <MyPastStreamsProvider host={userId}>
        <Grid
          gridAutoFlow="column"
          gridTemplateColumns="minmax(800px, 1fr) 250px"
          gridGap={36}
        >
          <Box>
            <Flex
              pb={space.xxs}
              flexDirection="row"
              alignItems="center"
              gridGap={space.xxs}
            >
              <Text textStyle="headline5" fontWeight={600} flexGrow={1}>
                Past Streams
              </Text>

              {/* <Flex
                flexDirection="row"
                alignItems="center"
                gridGap={space.xxxxxs}
              >
                <Icon icon="Sort" color={colors.textTertiary} />
                <Text
                  textStyle="label"
                  color={colors.textTertiary}
                  textTransform="uppercase"
                >
                  Sort
                </Text>
              </Flex> */}
            </Flex>

            <Box
              p={24}
              bg={colors.primaryDark}
              borderRadius={radii.xxxxs}
              border={`1px solid ${colors.secondaryLight}`}
            >
              <HubPastStreamsList creator={creator} />
            </Box>
          </Box>

          <MyPastStreamsContext.Consumer>
            {({ past }) => (
              <CreatorStatsBox
                creator={creator}
                creatorStats={creatorStats}
                showButton={past && past?.length > 0}
                pastStream={true}
              />
            )}
          </MyPastStreamsContext.Consumer>
        </Grid>
      </MyPastStreamsProvider>
    </Box>
  );
}
