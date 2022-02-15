import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useTheme } from "styled-components";

import API from "@/common/api";
import { Box, Flex, Grid } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
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

import AnalyticsSummaryBox from "../AnalyticsSummaryBox";
import ConversionFunnelBox from "../ConversionFunnelBox";
import CreatorFollowerTable from "../CreatorFollowerTable";
import TopCreatorsTable from "../TopCreatorsTable";
import TopPerformingStreamsTable from "../TopPerformingStreamsTable";
import TrafficSourceTypeBox from "../TrafficSourceTypeBox";

export default function CreatorFollowersTab(): JSX.Element {
  const [href, setHref] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLAnchorElement>(null);
  const { followers, setPage, loading, currentPage, pageCount } =
    useCreatorFollowers();
  const { space } = useTheme();
  const { clubMembersCount } = useClubMembersCount();
  const { followerGrowth } = useFollowerGrowth();
  const { averageEngagement } = useAverageEngagement();
  const { comparativeEngagement } = useComparativeEngagement();
  const { topStreams } = useTopStreams();
  const { topCreators } = useTopCreators();
  const { clubMembersGrowth } = useClubMembersGrowth();
  const { trafficSourceTypes } = useTrafficSourceTypes();
  const { conversionFunnelData } = useConversionFunnel();

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

  return (
    <Flex
      flexDirection="column"
      gridGap={space.s}
      px={[0, space.l]}
      py={space.xxs}
    >
      <AnalyticsSummaryBox
        clubMembersCount={clubMembersCount}
        followerGrowth={followerGrowth}
        percentageUserFromCrater={90}
        comparativeEngagement={comparativeEngagement}
        averageEngagement={averageEngagement}
        clubMembersGrowth={clubMembersGrowth}
      />

      <Grid
        gridAutoFlow="column"
        gridTemplateColumns="1fr 1fr"
        gridGap={space.s}
      >
        <TrafficSourceTypeBox trafficSourceTypes={trafficSourceTypes} />

        <ConversionFunnelBox conversionFunnelData={conversionFunnelData} />
      </Grid>

      <Grid
        gridAutoFlow="column"
        gridTemplateColumns="1fr 1fr"
        gridGap={space.s}
      >
        <TopPerformingStreamsTable topStreams={topStreams} />

        <TopCreatorsTable topCreators={topCreators} />
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
