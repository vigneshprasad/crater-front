import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Grid,
  Select,
  Shimmer,
  Flex,
  Text,
  BoxProps,
  Button,
} from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import useChallengesList from "@/leaderboard/context/ChallegeListContext";
import useLeaderboardList from "@/leaderboard/context/LeaderboardListContext";
import useUserLeaderboardsList from "@/leaderboard/context/UserLeaderboardListContext";
import { Challenge, Leaderboard } from "@/leaderboard/types/leaderboard";

type IProps = BoxProps & {
  heading?: string;
  showBelowDropdown?: boolean;
};

const Row = styled(Grid)`
  &:hover {
    background-color: ${(props) => props.theme.colors.whiteAlpha[0]};
  }
`;

export default function LeaderboardTable({
  showBelowDropdown = false,
  heading,
  ...props
}: IProps): JSX.Element {
  const router = useRouter();
  const { space, radii, borders, colors } = useTheme();
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

  return (
    <Box px={[space.xxxs, space.s]} py={space.xs} {...props}>
      {heading && (
        <Text py={space.xxs} textStyle="title">
          {heading}
        </Text>
      )}
      <Grid
        gridTemplateColumns="max-content 1fr max-content"
        alignItems="center"
        gridGap={[space.xxxs, space.xxs]}
      >
        {(() => {
          if (!challenges || loadingChallenges) {
            return <Shimmer h={48} w={120} borderRadius={radii.xxs} />;
          }
          return (
            <Select<Challenge>
              label="Pick a Challenge"
              items={challenges}
              itemLabelGetter={(item) => item.name}
              value={challenge}
              onChange={async (item) => {
                router.query.challenge = (item as Challenge).id.toString();
                await router.push(router);
                router.reload();
              }}
            />
          );
        })()}

        <Box>
          {!showBelowDropdown && challenge && (
            <Text>
              Ends{" "}
              {DateTime.parse_with_milliseconds(challenge?.end).toRelative()}
            </Text>
          )}
        </Box>

        {(() => {
          if (!leaderboards || loadingLeaderboards) {
            return <Shimmer h={48} w={120} borderRadius={radii.xxs} />;
          }
          return (
            <Select<Leaderboard>
              label="Pick a Leaderboard"
              items={leaderboards}
              itemLabelGetter={(item) => item.duration_type_detail.name}
              value={leaderboard}
              onChange={(item) => {
                router.query.leaderboard = (item as Leaderboard).id.toString();
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
            <Box>
              <Grid
                gridGap={space.xxxs}
                px={space.xxxs}
                py={space.xxs}
                gridTemplateColumns="72px minmax(120px, 1fr) 1fr"
                alignItems="center"
                borderBottom={`2px solid ${borders.main}`}
                borderTop={`2px solid ${borders.main}`}
              >
                <Box>
                  <Text textAlign="center" textStyle="tableHeader">
                    Rank
                  </Text>
                </Box>
                <Box>
                  <Text textStyle="tableHeader">Creator</Text>
                </Box>
                <Box>
                  <Text textStyle="tableHeader">Watchtime</Text>
                </Box>
              </Grid>
              {users.map((user, index) => (
                <Row
                  gridGap={space.xxxs}
                  cursor="pointer"
                  onClick={() => {
                    router.push(
                      PageRoutes.creatorProfile(user.creator_detail.slug)
                    );
                  }}
                  px={space.xxxs}
                  py={space.xxs}
                  gridTemplateColumns="72px minmax(120px, 1fr) 1fr"
                  key={user.id}
                  alignItems="center"
                  borderBottom={`2px solid ${borders.main}`}
                >
                  <Grid>
                    <Grid
                      m="auto auto"
                      bg={colors.accent}
                      borderRadius="50%"
                      w={24}
                      h={24}
                    >
                      <Text m="auto auto">{index + 1}</Text>
                    </Grid>
                  </Grid>
                  <Box>
                    <Flex alignItems="center" gridGap={space.xxxs}>
                      <Avatar size={36} image={user.user_detail.photo} />
                      <Text>{user.user_detail.name}</Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Text>{user.total_minutes} mins</Text>
                  </Box>
                </Row>
              ))}
            </Box>
          );
        })()}
        {showBelowDropdown && challenge && (
          <Text px={space.xxs} py={space.xxs} textAlign="center">
            The Challenge ends{" "}
            {DateTime.parse_with_milliseconds(challenge?.end).toRelative()}
          </Text>
        )}
        {showBelowDropdown && <Button m="auto auto" text="Join Challenge" />}
      </Box>
    </Box>
  );
}
