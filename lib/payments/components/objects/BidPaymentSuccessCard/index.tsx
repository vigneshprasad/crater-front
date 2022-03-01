import * as animData from "public/anims/success-check.json";
import Lottie from "react-lottie";
import { useTheme } from "styled-components";

import { Flex, Text, Box, BoxProps } from "@/common/components/atoms";

export default function BidPaymentSuccessCard({
  ...props
}: BoxProps): JSX.Element {
  const { space, borders, radii } = useTheme();
  return (
    <Box px={space.s} py={space.xxxs} {...props}>
      <Flex
        border={`2px solid ${borders.main}`}
        flexDirection={["column", "row"]}
        alignItems="center"
        gridGap={space.xxs}
        px={space.s}
        py={space.xxs}
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
          <Text textStyle="headline6" textAlign={["center", "left"]}>
            Congratulations! You have successfully placed a bid.
          </Text>
          <Text textAlign={["center", "left"]}>
            If the creator accepts the bid, you will receive access. If the bid
            is rejected your money will be refunded. Need help? Whatsapp:
            +919930474469
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
