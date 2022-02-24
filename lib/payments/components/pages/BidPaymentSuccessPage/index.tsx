import * as animData from "public/anims/success-check.json";
import Lottie from "react-lottie";
import { useTheme } from "styled-components";

import { Box, Grid, Text, Flex } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import RewardsList from "@/tokens/components/objects/RewardsList";
import useBid from "@/tokens/context/BidContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

export default function BidPaymentSuccessPage(): JSX.Element {
  const { bid, loading } = useBid();
  const { space, borders, radii } = useTheme();
  const { rewards, loading: loadingRewards } = useRewardsList();

  if (!bid || loading) {
    return (
      <Grid m="auto auto">
        <Spinner />
      </Grid>
    );
  }

  return (
    <Flex flexDirection="column" px={space.xs} py={space.s} gridGap={space.xs}>
      <Flex
        border={`2px solid ${borders.main}`}
        flexDirection="row"
        alignItems="center"
        gridGap={space.xxs}
        p={space.s}
        borderRadius={radii.xs}
      >
        <Lottie
          height={72}
          width={72}
          options={{
            loop: false,
            autoplay: true,
            animationData: animData,
          }}
        />
        <Box flex="1">
          <Text textStyle="headline6">Payment Success!</Text>
          <Text>Your bid was placed successfully.</Text>
        </Box>

        <Flex flexDirection="column" alignItems="flex-end" gridGap={space.xxs}>
          <Button text="View My Holdings" />
          <Text>View your token holdings at your HUB.</Text>
        </Flex>
      </Flex>

      <Box>
        <Text mb={space.xs} textStyle="headline6">
          More Ticket&#39;s
        </Text>
        <RewardsList rewards={rewards} loading={loadingRewards} split={false} />
      </Box>
    </Flex>
  );
}
