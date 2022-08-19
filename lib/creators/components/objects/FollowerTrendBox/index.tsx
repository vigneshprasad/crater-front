import { useTheme } from "styled-components";

import { Box, Shimmer, Text } from "@/common/components/atoms";
import { ClubMembersGrowth } from "@/creators/types/creator";

import FollowerTrendChart from "../FollowerTrendChart";

type IProps = {
  clubMembersGrowth?: ClubMembersGrowth[];
};

export default function FollowerTrendBox({
  clubMembersGrowth,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

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
        Follower Trend
      </Text>
      {(() => {
        if (!clubMembersGrowth) {
          return <Shimmer w="100%" h={300} />;
        }

        return <FollowerTrendChart clubMembersGrowth={clubMembersGrowth} />;
      })()}
    </Box>
  );
}
