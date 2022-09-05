import { DateTime } from "luxon";
import { useTheme } from "styled-components";
import useSWR from "swr";

import {
  Box,
  Flex,
  Grid,
  Shimmer,
  Span,
  Text,
} from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { useClubMembersGrowth } from "@/creators/context/ClubMembersGrowth";
import { useConversionFunnel } from "@/creators/context/ConversionFunnel";
import { useTopStreams } from "@/creators/context/CreatorTopStreams";
import { useTrafficSourceTypes } from "@/creators/context/TrafficSourceTypes";
import { Creator, StreamCompletionRate } from "@/creators/types/creator";
import {
  ChannelStats,
  PlatformStats,
  StreamCategoryDistribution,
} from "@/creators/types/stream";

import ChannelStatisticsSummaryBox from "../ChannelStatisticsSummaryBox";
import ConversionFunnelBox from "../ConversionFunnelBox";
import FollowerTrendBox from "../FollowerTrendBox";
import PlatformStatisticsSummaryBox from "../PlatformStatisticsSummaryBox";
import StreamCategoryDistributionBox from "../StreamCategoryDistributionBox";
import StreamCompletionRateBox from "../StreamCompletionRateBox";
import TopPerformingStreamsBox from "../TopPerformingStreamsBox";
import TrafficSourceTypeBox from "../TrafficSourceTypeBox";

type IProps = {
  creator: Creator | null;
};

export default function HubChannelStatisticsTab({
  creator,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { topStreams } = useTopStreams();
  const { conversionFunnelData } = useConversionFunnel();
  const { trafficSourceTypes } = useTrafficSourceTypes();
  const { clubMembersGrowth } = useClubMembersGrowth();

  const { data: channelStats } = useSWR<ChannelStats>(
    API_URL_CONSTANTS.analytics.getChannelStats
  );

  const { data: platformStats } = useSWR<PlatformStats>(
    API_URL_CONSTANTS.analytics.getPlatformStats
  );

  const { data: streamCategoryDistribution } = useSWR<
    StreamCategoryDistribution[]
  >(API_URL_CONSTANTS.analytics.getStreamCategoryDistribution);

  const { data: streamTimeData } = useSWR<{ time: string }>(
    API_URL_CONSTANTS.analytics.getStreamTime
  );

  const { data: streamCompletionData } = useSWR<StreamCompletionRate[]>(
    API_URL_CONSTANTS.analytics.getStreamCompletionRate
  );

  return (
    <Box pt={space.xxs} pb={space.s} minWidth={1000}>
      <Grid
        gridAutoFlow="row"
        gridTemplateColumns="1fr 1fr"
        gridTemplateAreas={`
          "header header"
          "channel_summary channel_summary"
          "stream_completion follower_trend"
          "stream_engagement stream_engagement"
          "top_streams top_streams"
          "traffic_sources conversion_funnel"
        `}
        gridGap={space.xxxs}
      >
        <Box gridArea="header">
          <Text textStyle="headline5" fontWeight={600}>
            Channel Statistics
          </Text>
          <Text pt={space.xxxxs} textStyle="body" color={colors.textTertiary}>
            We have curated statistics that can help you understand your viewers
            better and improve your content.
          </Text>

          <Flex
            mt={space.xs}
            p={`14px ${space.xxs}px`}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            bg={colors.primaryDark}
            borderRadius={radii.xxxxs}
          >
            <Text
              textStyle="label"
              color={colors.textTertiary}
              textTransform="uppercase"
            >
              {DateTime.now().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </Text>
            <Text
              textStyle="label"
              color={colors.textTertiary}
              textTransform="uppercase"
            >
              STREAM TIME TODAY:{" "}
              <Span color={colors.accentLight}>
                {streamTimeData?.time ?? "00:00:00"}
              </Span>
            </Text>
          </Flex>
        </Box>

        <Box gridArea="channel_summary">
          {(() => {
            if (!channelStats) {
              return <Shimmer w="100%" h={128} borderRadius={radii.xxxxs} />;
            }

            return (
              <ChannelStatisticsSummaryBox
                totalStreamTime={channelStats.total_stream_time}
                totalStreams={channelStats.total_streams}
                totalFollowers={channelStats.total_followers}
                averageStreamLength={channelStats.average_stream_length}
              />
            );
          })()}
        </Box>

        <Box gridArea="stream_completion">
          <StreamCompletionRateBox
            streamCompletionData={streamCompletionData}
          />
        </Box>

        <Box gridArea="follower_trend">
          <FollowerTrendBox clubMembersGrowth={clubMembersGrowth} />
        </Box>

        <Box
          gridArea="stream_engagement"
          p={`${space.xxs}px 24px`}
          borderRadius={radii.xxxxs}
          border={`1px solid ${colors.secondaryLight}`}
        >
          <Grid gridAutoFlow="column" gridTemplateColumns="300px auto">
            <Box p={space.xxxxs}>
              <Text
                pb={space.xxxxs}
                textStyle="label"
                color={colors.accentLight}
                textTransform="uppercase"
              >
                Avg Stream Engagement
              </Text>
              {!channelStats ? (
                <Shimmer w={150} h={38} borderRadius={radii.xxxxs} />
              ) : (
                <Text pt={space.xxxxs} fontSize="2.0rem" fontWeight={500}>
                  <Span fontSize="4.0rem">
                    {channelStats.average_stream_engagement}
                  </Span>{" "}
                  messages
                </Text>
              )}
            </Box>
            <Box
              p="14px 24px"
              bg={colors.primaryLight}
              borderRadius={radii.xxxxs}
            >
              <Text textStyle="label">About this metric</Text>
              <Text
                pt={space.xxxxs}
                textStyle="body"
                color={colors.textTertiary}
              >
                Engagement on chat is how your viewers interact with you.
                Keeping your chat active can help you gain new followers. This
                can prove to be an important metric in knowing how your content
                is doing.
              </Text>
            </Box>
          </Grid>
        </Box>

        <Box gridArea="top_streams">
          <TopPerformingStreamsBox topStreams={topStreams} />
        </Box>

        <Box gridArea="traffic_sources">
          <TrafficSourceTypeBox trafficSourceTypes={trafficSourceTypes} />
        </Box>

        <Box gridArea="conversion_funnel">
          <ConversionFunnelBox
            creator={creator}
            conversionFunnelData={conversionFunnelData}
          />
        </Box>
      </Grid>

      <Grid
        mt={space.m}
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
      >
        <Box>
          <Text textStyle="headline5" fontWeight={600}>
            Platform Statistics
          </Text>
          <Text pt={space.xxxxs} textStyle="body" color={colors.textTertiary}>
            Overall platform statistics - see what other creators are streaming
            about, and improve your content to suit your viewers.
          </Text>
        </Box>
        {(() => {
          if (!platformStats) {
            return <Shimmer w="100%" h={128} borderRadius={radii.xxxxs} />;
          }

          return (
            <PlatformStatisticsSummaryBox
              totalCreators={platformStats.total_creators}
              totalStreamsPastWeek={platformStats.total_streams_past_week}
              chatEngagement={platformStats.chat_engagement}
              avgStreamLength={platformStats.avg_stream_length}
            />
          );
        })()}
        <StreamCategoryDistributionBox
          streamCategoryDistribution={streamCategoryDistribution}
        />
      </Grid>
    </Box>
  );
}
