import { useMemo } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import { Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import Select from "@/common/components/atoms/Select/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Creator, CreatorStats } from "@/creators/types/creator";
import {
  UpcomingStreamsContext,
  UpcomingStreamsProvider,
} from "@/stream/context/UpcomingStreamsContext";
import { SortByField } from "@/stream/types/stream";

import CreatorStatsBox from "../CreatorStatsBox";
import HubUpcomingStreamsList from "../HubUpcomingStreamsList.tsx";

type IProps = {
  creator: Creator | null;
  userId?: string;
};

const sortByFields: {
  key: SortByField;
  label: string;
}[] = [
  {
    key: SortByField.TODAY,
    label: "Today",
  },
  {
    key: SortByField.THIS_WEEK,
    label: "This Week",
  },
  {
    key: SortByField.NEXT_WEEK,
    label: "Next Week",
  },
  {
    key: SortByField.THIS_MONTH,
    label: "This Month",
  },
];

export default function HubUpcomingStreamsTab({
  creator,
  userId,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const router = useRouter();

  const { data: creatorStats } = useSWR<CreatorStats[]>(
    API_URL_CONSTANTS.creator.getStats
  );

  const sortBy = router.query.sortBy as string | undefined;
  const sortByField = useMemo<string>(() => {
    const sortByField = sortByFields.filter((item) => item.key === sortBy)[0];

    if (!sortByField) {
      const defaultSortByField = sortByFields.filter(
        (item) => item.key === SortByField.THIS_WEEK
      )[0];
      router.push(
        {
          pathname: PageRoutes.hub("streams", "upcoming"),
          query: {
            sortBy: defaultSortByField.key,
          },
        },
        undefined,
        { shallow: true }
      );

      return defaultSortByField.label;
    }

    return sortByField.label;
  }, [router, sortBy]);

  const handleSortFieldChange = (key: string): void => {
    router.push(
      {
        pathname: PageRoutes.hub("streams", "upcoming"),
        query: {
          sortBy: key,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Box pt={space.xxs} overflow="auto" minWidth={1000}>
      <UpcomingStreamsProvider
        host={userId}
        sortBy={sortBy ?? SortByField.THIS_WEEK}
      >
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
                Upcoming Streams
              </Text>

              <Flex
                flexDirection="row"
                alignItems="center"
                gridGap={space.xxxxxs}
              >
                <Icon
                  icon="Sort"
                  color={creator ? colors.textTertiary : colors.textQuartenary}
                />
                <Text
                  textStyle="label"
                  color={creator ? colors.textTertiary : colors.textQuartenary}
                  textTransform="uppercase"
                >
                  Sort
                </Text>
              </Flex>

              <Box w={164}>
                <Select
                  label={sortByField}
                  defaultValue={sortByField}
                  items={sortByFields}
                  itemLabelGetter={(item) => item.label}
                  dataTransform={(item) => item.key}
                  onChange={(val) => handleSortFieldChange(val as string)}
                  disabled={creator ? false : true}
                />
              </Box>
            </Flex>

            <Box
              p={24}
              bg={colors.primaryDark}
              borderRadius={radii.xxxxs}
              border={`1px solid ${colors.secondaryLight}`}
            >
              <HubUpcomingStreamsList creator={creator} />
            </Box>
          </Box>

          <UpcomingStreamsContext.Consumer>
            {({ upcoming }) => (
              <CreatorStatsBox
                creator={creator}
                creatorStats={creatorStats}
                showButton={upcoming && upcoming?.length > 0}
              />
            )}
          </UpcomingStreamsContext.Consumer>
        </Grid>
      </UpcomingStreamsProvider>
    </Box>
  );
}
