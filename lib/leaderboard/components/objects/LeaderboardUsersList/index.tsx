import { useTheme } from "styled-components";

import { Box, Flex, Text, Avatar } from "@/common/components/atoms";
import { UserLeaderboard } from "@/leaderboard/types/leaderboard";

interface IProps {
  users?: UserLeaderboard[];
  loading: boolean;
}

export default function LeaderboardUsersList({
  users,
  loading,
}: IProps): JSX.Element {
  const { space } = useTheme();

  if (loading || !users) {
    return <Box>Loadding</Box>;
  }

  return (
    <Box>
      {users?.map((user) => (
        <Flex
          key={user.id}
          px={space.s}
          py={space.xs}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text textStyle="title">1</Text>
          <Flex alignItems="center">
            <Avatar size={44} />
            <Box>
              <Text>Abhishek Rajamohan</Text>
            </Box>
          </Flex>

          <Text>42:45:30</Text>
        </Flex>
      ))}
    </Box>
  );
}
