import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import {
  Box,
  BoxProps,
  Flex,
  Icon,
  Image,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

export default function StartStreaming({ ...props }: BoxProps): JSX.Element {
  const { space, fonts } = useTheme();
  return (
    <Box position="relative" {...props}>
      <Image src={STATIC_IMAGES.ImageCraterStream} alt="asd" />
      <Flex
        position="absolute"
        top="25%"
        right="10%"
        alignItems="center"
        flexDirection="column"
        gridGap={space.xxxs}
      >
        <Text
          fontFamily={fonts.heading}
          textStyle="headline2"
          textAlign="center"
        >
          Live Stream on Crater
        </Text>
        <Text fontFamily={fonts.heading} fontWeight="400" textAlign="center">
          STREAM&nbsp;&nbsp;&nbsp;&nbsp;ANALYZE &nbsp;&nbsp;&nbsp;&nbsp;AUCTION
        </Text>

        <Button
          variant="displayLarge"
          label="Start Streaming"
          suffixElement={<Icon icon="ChevronRight" />}
        />
      </Flex>
    </Box>
  );
}
