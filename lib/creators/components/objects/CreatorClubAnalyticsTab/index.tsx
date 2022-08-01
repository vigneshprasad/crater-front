import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useTheme } from "styled-components";

import API from "@/common/api";
import { Box, Card, Flex, Grid, Text } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
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
import { useUsersByCrater } from "@/creators/context/UsersByCrater";
import { Creator } from "@/creators/types/creator";

import AnalyticsSummaryBox from "../AnalyticsSummaryBox";
import ConversionFunnelBox from "../ConversionFunnelBox";
import CreatorFollowerTable from "../CreatorFollowerTable";
import TopCreatorsTable from "../TopCreatorsTable";
import TopPerformingStreamsTable from "../TopPerformingStreamsTable";
import TrafficSourceTypeBox from "../TrafficSourceTypeBox";

type IProps = {
  creator?: Creator;
};

export default function CreatorClubAnalytics({ creator }: IProps): JSX.Element {
  const [href, setHref] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLAnchorElement>(null);
  const { followers, setPage, loading, currentPage, pageCount } =
    useCreatorFollowers();
  const { space, breakpoints } = useTheme();
  const { clubMembersCount } = useClubMembersCount();
  const { followerGrowth } = useFollowerGrowth();
  const { averageEngagement } = useAverageEngagement();
  const { comparativeEngagement } = useComparativeEngagement();
  const { topStreams } = useTopStreams();
  const { comparativeRankingData } = useTopCreators();
  const { clubMembersGrowth } = useClubMembersGrowth();
  const { trafficSourceTypes } = useTrafficSourceTypes();
  const { conversionFunnelData } = useConversionFunnel();
  const { usersByCrater: percentageUsersFromCrater } = useUsersByCrater();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

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

  function onClickNextPage(): void {
    if (currentPage < pageCount) {
      setPage((page) => page + 1);
    }
  }

  function onClickPrevPage(): void {
    if (currentPage > 1) {
      setPage((page) => page - 1);
    }
  }

  return (
    <>
      {isMobile ? (
        <Box py={space.xs}>
          <Text textAlign="center">
            Mobile view unavailable. Please view on desktop.
          </Text>
        </Box>
      ) : (
        <>
          <Grid
            gridTemplateColumns="1fr 1fr"
            gridGap={space.s}
            px={[space.xxs, space.s]}
            py={space.s}
          >
            {creator?.show_analytics && (
              <>
                <AnalyticsSummaryBox
                  clubMembersCount={clubMembersCount}
                  followerGrowth={followerGrowth}
                  percentageUsersFromCrater={percentageUsersFromCrater}
                  comparativeEngagement={comparativeEngagement}
                  averageEngagement={averageEngagement}
                  clubMembersGrowth={clubMembersGrowth}
                  gridColumn="1 / span 2"
                />

                <TrafficSourceTypeBox trafficSourceTypes={trafficSourceTypes} />

                <ConversionFunnelBox
                  conversionFunnelData={conversionFunnelData}
                />

                <TopPerformingStreamsTable topStreams={topStreams} />

                <TopCreatorsTable
                  comparativeRankingData={comparativeRankingData}
                />
              </>
            )}

            {creator?.show_club_members && (
              <Card containerProps={{ px: 0, py: 0 }} gridColumn="1 / span 2">
                <Box p={space.xs}>
                  <Flex justifyContent="space-between">
                    <Text textStyle="headline5">Club Members</Text>

                    <Flex
                      pb={space.xs}
                      flexDirection="row"
                      gridGap={space.xxxs}
                      alignItems="center"
                    >
                      <IconButton
                        variant="roundSmall"
                        icon="ChevronLeft"
                        onClick={onClickPrevPage}
                      />
                      <Text>
                        Page {currentPage} of {pageCount}
                      </Text>
                      <IconButton
                        variant="roundSmall"
                        icon="ChevronRight"
                        onClick={onClickNextPage}
                      />
                    </Flex>
                  </Flex>

                  <a
                    ref={ref}
                    href={href}
                    style={{ display: "none" }}
                    download="followers.csv"
                  />
                  <CreatorFollowerTable
                    loading={loading}
                    data={followers}
                    onPressDownloadCSV={handleExportCsvBtnClick}
                  />
                </Box>
              </Card>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
