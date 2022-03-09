import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Box, Grid, Text, Flex, Image } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { UserReward } from "@/tokens/types/exchange";

interface IProps {
  userRewards?: UserReward[];
  loading: boolean;
  renderList: (userReward: UserReward[]) => JSX.Element[];
}

export default function UserRewardList({
  userRewards,
  renderList,
  loading,
}: IProps): JSX.Element {
  const { borders, space } = useTheme();

  if (loading || !userRewards) {
    return <Box>Loading...</Box>;
  }

  if (userRewards.length === 0) {
    return (
      <Grid
        border={`2px dashed ${borders.main}`}
        py={space.s}
        gridGap={space.xxs}
      >
        <Box w={96} m="auto auto">
          <Image src={STATIC_IMAGES.ImageEmptyWallet} alt="No rewards" />
        </Box>
        <Flex
          m="auto auto"
          flexDirection="column"
          alignItems="center"
          gridGap={space.xxs}
        >
          <Text textAlign="center">You have no rewards. Discover more</Text>
          <Button text="Explore Rewards" />
        </Flex>
      </Grid>
    );
  }
  return (
    <Box overflowY="auto" maxHeight={320}>
      {userRewards && (
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))">
          {renderList(userRewards)}
        </Grid>
      )}
    </Box>
  );
}
