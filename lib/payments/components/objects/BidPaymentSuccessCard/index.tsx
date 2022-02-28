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
        flexDirection="row"
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
          <Text textStyle="headline6">Payment Success!</Text>
          <Text>Your bid was placed successfully.</Text>
        </Box>
      </Flex>
    </Box>
  );
}
