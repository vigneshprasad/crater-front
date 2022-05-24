import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Box, Flex, Icon, Image, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

export default function StartStreaming(): JSX.Element {
  const { space } = useTheme();
  return (
    <Box position="relative">
      <Image src={STATIC_IMAGES.ImageCraterStream} alt="asd" />
      <Flex
        position="absolute"
        top="25%"
        right={36}
        alignItems="center"
        flexDirection="column"
        gridGap={space.xxxs}
      >
        <Text textStyle="headline2" textAlign="center">
          Live Stream on Crater
        </Text>
        <Text textAlign="center">
          STREAM{"  "}ANALYZE{"  "}AUCTION
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
