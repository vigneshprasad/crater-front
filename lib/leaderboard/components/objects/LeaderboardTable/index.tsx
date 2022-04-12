import { useMemo } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Grid,
  Select,
  Shimmer,
  Flex,
  Text,
  Icon,
} from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import { PageRoutes } from "@/common/constants/route.constants";
import useChallengesList from "@/leaderboard/context/ChallegeListContext";
import useLeaderboardList from "@/leaderboard/context/LeaderboardListContext";
import useUserLeaderboardsList from "@/leaderboard/context/UserLeaderboardListContext";
import {
  Challenge,
  Leaderboard,
  UserLeaderboard,
} from "@/leaderboard/types/leaderboard";

export default function LeaderboardTable(): JSX.Element {
  const router = useRouter();
  const { space, radii } = useTheme();
  const { challenges, loading: loadingChallenges } = useChallengesList();
  const { leaderboards, loading: loadingLeaderboards } = useLeaderboardList();
  const { users, loading: usersLoading } = useUserLeaderboardsList();

  const challenge = useMemo<Challenge | undefined>(() => {
    if (!challenges) {
      return undefined;
    }

    const activeChallenge = parseInt(router.query.challenge as string, 10);

    return challenges.find((challenge) => challenge.id === activeChallenge);
  }, [challenges, router]);

  const leaderboard = useMemo<Leaderboard | undefined>(() => {
    if (!leaderboards) {
      return undefined;
    }

    const activeLeaderboard = parseInt(router.query.leaderboard as string, 10);

    return leaderboards.find(
      (leaderboard) => leaderboard.id === activeLeaderboard
    );
  }, [leaderboards, router]);

  const columns = useMemo<Column<UserLeaderboard>[]>(
    () => [
      {
        key: "rank",
        label: "Rank",
        valueGetter: (user) => user.rank,
      },
      {
        key: "user",
        label: "Creator",
        valueGetter: (user) => (
          <Flex alignItems="center" gridGap={space.xxs}>
            <Avatar size={36} image={user.user_detail.photo} />
            <Text>{user.user_detail.name}</Text>
          </Flex>
        ),
      },
      {
        key: "minutes",
        label: "Watchtime",
        valueGetter: (user) => `${user.total_minutes} mins`,
      },
      {
        key: "cta",
        label: "",
        valueGetter: () => (
          <Flex justifyContent="end">
            <Icon icon="ChevronRight" />
          </Flex>
        ),
      },
    ],
    [space]
  );

  return (
    <Box px={[space.xxxs, space.s]} py={space.xs}>
      <Grid gridTemplateColumns="max-content 1fr max-content">
        {(() => {
          if (!challenges || loadingChallenges) {
            return <Shimmer h={48} w={180} borderRadius={radii.xxs} />;
          }
          return (
            <Select<Challenge>
              label="Pick a Challenge"
              items={challenges}
              itemLabelGetter={(item) => item.name}
              value={challenge}
              onChange={async (item) => {
                router.query.challenge = item.id.toString();
                await router.push(router);
                router.reload();
              }}
            />
          );
        })()}

        <Box />

        {(() => {
          if (!leaderboards || loadingLeaderboards) {
            return <Shimmer h={48} w={180} borderRadius={radii.xxs} />;
          }
          return (
            <Select<Leaderboard>
              label="Pick a Leaderboard"
              items={leaderboards}
              itemLabelGetter={(item) => item.duration_type_detail.name}
              value={leaderboard}
              onChange={(item) => {
                router.query.leaderboard = item.id.toString();
                router.push(router);
              }}
            />
          );
        })()}
      </Grid>

      <Box py={space.xs}>
        {(() => {
          if (!users || usersLoading) {
            return <Shimmer h={240} />;
          }

          return (
            <DataTable
              onClickRow={(user) => {
                router.push(
                  PageRoutes.creatorProfile(user.creator_detail.slug)
                );
              }}
              data={users.map((user, index) => ({ ...user, rank: index + 1 }))}
              columns={columns}
            />
          );
        })()}
      </Box>
    </Box>
  );
}
