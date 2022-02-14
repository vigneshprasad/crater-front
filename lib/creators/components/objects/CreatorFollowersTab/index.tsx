import { AxiosError } from "axios";
import { useMemo, useRef, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "styled-components";

import API from "@/common/api";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { useAverageEngagement } from "@/creators/context/AverageEngagement";
import { useClubMembersCount } from "@/creators/context/ClubMembersCount";
import { useClubMembersGrowth } from "@/creators/context/ClubMembersGrowth";
import { useComparativeEngagement } from "@/creators/context/ComparativeEngagement";
import { useConversionFunnel } from "@/creators/context/ConversionFunnel";
import useCreatorFollowers from "@/creators/context/CreatorFollowerContext";
import { useTopStreams } from "@/creators/context/CreatorTopStreams";
import { useFollowerGrowth } from "@/creators/context/FollowerGrowth";
import { useTopCreators } from "@/creators/context/TopCreators";
import { useTrafficSourceTypes } from "@/creators/context/TrafficSourceTypes";
import { TopCreators } from "@/creators/types/creator";
import { TopStreams } from "@/creators/types/stream";

import CreatorFollowerTable from "../CreatorFollowerTable";

export default function CreatorFollowersTab(): JSX.Element {
  const [href, setHref] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLAnchorElement>(null);
  const { followers, setPage, loading, currentPage, pageCount } =
    useCreatorFollowers();
  const { space, colors } = useTheme();
  const { clubMembersCount, loading: clubMembersCountLoading } =
    useClubMembersCount();
  const { followerGrowth, loading: followerGrowthLoading } =
    useFollowerGrowth();
  const { averageEngagement, loading: averageEngagementLoading } =
    useAverageEngagement();
  const { comparativeEngagement, loading: comparativeEngagementLoading } =
    useComparativeEngagement();
  const { topStreams, loading: topStreamsLoading } = useTopStreams();
  const { topCreators, loading: topCreatorsLoading } = useTopCreators();
  const { clubMembersGrowth, loading: clubMembersGrowthLoading } =
    useClubMembersGrowth();
  const { trafficSourceTypes, loading: trafficSourceTypesLoading } =
    useTrafficSourceTypes();
  const { conversionFunnel, loading: conversionFunnelLoading } =
    useConversionFunnel();

  function triggerFileDownload(response: string): void {
    if (ref.current) {
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      setHref(url);
      ref.current.click();
      window.URL.revokeObjectURL(url);
    }
  }

  async function handleExportCsvBtnClick(): Promise<undefined | unknown> {
    try {
      const { data } = await API().get<string>(
        API_URL_CONSTANTS.creator.downloadCreatorFollowersCsv
      );
      triggerFileDownload(data);
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  const topStreamsColumns = useMemo<Column<TopStreams>[]>(() => {
    return [
      {
        label: "Stream",
        key: "stream",
        valueGetter: (obj) => {
          console.log(obj.start);
          const startTime = DateTime.parse_with_milliseconds(obj.start);
          console.log(startTime);

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
        valueGetter: (obj) => obj.rsvp_count, // Return JSX
      },
      {
        label: "Messages",
        key: "messages",
        valueGetter: (obj) => obj.messages_count, // Return JSX
      },
    ];
  }, [space, colors]);

  const topCreatorsColumns = useMemo<Column<TopCreators>[]>(() => {
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
        valueGetter: (obj) => obj.follower_count,
      },
      {
        label: "Top Stream",
        key: "topStream",
        valueGetter: (obj) => obj.stream_topic,
      },
    ];
  }, [space]);

  return (
    <Flex
      flexDirection="column"
      gridGap={space.s}
      px={[0, space.l]}
      py={space.xxs}
    >
      <Card containerProps={{ px: 0, py: 0 }}>
        <Grid
          gridAutoFlow="row"
          gridGap={space.s}
          gridTemplateColumns="repeat(4, 1fr)"
        >
          <Grid gridAutoFlow="column">
            <Box
              w="100%"
              textAlign="center"
              border={`1px solid ${colors.black[3]}`}
              p={space.xxs}
            >
              <Text color={colors.accent}>My Club</Text>
              {clubMembersCountLoading ? (
                <Spinner m="0 auto" />
              ) : (
                <Flex
                  m="0 auto"
                  gridGap={space.xxxs}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text py={space.xxxs} textStyle="headline3">
                    {clubMembersCount}
                  </Text>
                  <Text>Members</Text>
                </Flex>
              )}
            </Box>
            <Box
              w="100%"
              textAlign="center"
              border={`1px solid ${colors.black[3]}`}
              p={space.xxs}
            >
              <Text color={colors.accent}>Growth this month</Text>
              {followerGrowthLoading ? (
                <Spinner m="0 auto" />
              ) : (
                <Text py={space.xxxs} textStyle="headline3">
                  {followerGrowth}%
                </Text>
              )}
            </Box>
            <Box
              w="100%"
              textAlign="center"
              border={`1px solid ${colors.black[3]}`}
              p={space.xxs}
            >
              <Text color={colors.accent}>Users brought in by Crater</Text>
              <Text py={space.xxxs} textStyle="headline3">
                90%
              </Text>
            </Box>
            <Box
              w="100%"
              textAlign="center"
              border={`1px solid ${colors.black[3]}`}
              p={space.xxs}
            >
              <Text color={colors.accent}>Average Engagement</Text>
              {averageEngagementLoading ? (
                <Spinner m="0 auto" />
              ) : (
                <Flex
                  m="0 auto"
                  gridGap={space.xxxs}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text py={space.xxxs} textStyle="headline3">
                    {averageEngagement}
                  </Text>
                  <Text>Messages</Text>
                </Flex>
              )}
            </Box>
            <Box
              w="100%"
              textAlign="center"
              border={`1px solid ${colors.black[3]}`}
              p={space.xxs}
            >
              <Text color={colors.accent}>Comparative Engagement</Text>
              {comparativeEngagementLoading ? (
                <Spinner m="0 auto" />
              ) : (
                <Text py={space.xxxs} textStyle="headline3">
                  {comparativeEngagement}%
                </Text>
              )}
            </Box>
          </Grid>

          <Box px={space.s} h={320}>
            {clubMembersGrowthLoading ? (
              <Shimmer w="100%" h="100%" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clubMembersGrowth}>
                  <Line
                    type="monotone"
                    dataKey="follower_count"
                    stroke="#8884d8"
                  />
                  <CartesianGrid stroke={colors.black[1]} vertical={false} />
                  <XAxis
                    dataKey="followed_at_date"
                    interval="preserveStartEnd"
                  />
                  <YAxis orientation="right" allowDecimals={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Grid>
      </Card>

      <Grid
        gridAutoFlow="column"
        gridTemplateColumns="1fr 1fr"
        gridGap={space.s}
      >
        <Card containerProps={{ p: 0 }}>
          <Text textStyle="headline5" py={space.xxs}>
            Traffic Source Types
          </Text>

          <Grid gridAutoFlow="row" gridGap={space.xxs}>
            {trafficSourceTypesLoading ? (
              <Spinner m="0 auto" />
            ) : (
              <Grid
                gridAutoFlow="column"
                gridGap={space.xxs}
                gridTemplateColumns="1fr 1fr"
              >
                <PieChart width={400} height={400}>
                  <Pie
                    data={trafficSourceTypes}
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    fill={colors.accent}
                    label
                  />
                </PieChart>

                <Grid
                  m="auto 0"
                  gridAutoFlow="row"
                  alignItems="center"
                  gridGap={space.xs}
                >
                  {trafficSourceTypes &&
                    trafficSourceTypes.map((obj) => (
                      <Grid
                        gridAutoFlow="column"
                        gridGap={space.xs}
                        key={obj.source_name}
                      >
                        <Text justifySelf="start">{obj.source_name}</Text>
                        <Text justifySelf="end">{obj.count}</Text>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Card>

        <Card containerProps={{ p: 0, textAlign: "center" }}>
          <Text py={space.xxs} textStyle="headline5">
            Conversion Funnel
          </Text>
          {conversionFunnelLoading ? (
            <Spinner />
          ) : (
            <Grid my={space.l} gridAutoFlow="row" gridGap={space.xxs}>
              <Text>Total RSVPs</Text>
              <Text>{conversionFunnel?.rsvp_count}</Text>

              <Text>Total Subscribers</Text>
              <Text>{conversionFunnel?.subscriber_count}</Text>

              <Text>Total Recurring Users</Text>
              <Text>{conversionFunnel?.recurring_user_count}</Text>
            </Grid>
          )}
        </Card>
      </Grid>

      <Grid
        gridAutoFlow="column"
        gridTemplateColumns="1fr 1fr"
        gridGap={space.s}
      >
        <Card containerProps={{ p: 0, textAlign: "center" }}>
          <Text py={space.xxs} textStyle="headline5">
            Your Top Performing Streams
          </Text>

          {topStreamsLoading ? (
            <Spinner m="0 auto" />
          ) : (
            <DataTable columns={topStreamsColumns} data={topStreams} />
          )}
        </Card>

        <Card containerProps={{ p: 0, textAlign: "center" }}>
          <Grid gridAutoFlow="row" gridTemplateRows="max-content 1fr">
            <Text py={space.xxs} textStyle="headline5" justifySelf="center">
              Comparative Ranking
            </Text>

            {topCreatorsLoading ? (
              <Spinner m="0 auto" />
            ) : (
              <DataTable columns={topCreatorsColumns} data={topCreators} />
            )}
          </Grid>
        </Card>
      </Grid>

      <Box>
        <a
          ref={ref}
          href={href}
          style={{ display: "none" }}
          download="followers.csv"
        />
        <CreatorFollowerTable
          pageCount={pageCount}
          currentPage={currentPage}
          loading={loading}
          data={followers}
          onPressDownloadCSV={handleExportCsvBtnClick}
          setPage={setPage}
        />
      </Box>
    </Flex>
  );
}
