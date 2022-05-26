import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Box, Flex, Image, Text } from "@/common/components/atoms";
import AppLink, { AppLinkType } from "@/common/components/objects/AppLink/v2";

export default function DownloadApp(): JSX.Element {
  const { colors, space, fonts } = useTheme();
  return (
    <Box position="relative">
      <Image src={STATIC_IMAGES.ImageAppBannerStream} alt="" />
      <Flex
        gridGap={space.xxxs}
        position="absolute"
        top="20%"
        right={36}
        alignItems="center"
        flexDirection="column"
      >
        <Text
          fontFamily={fonts.heading}
          color={colors.textSecondaryLight}
          textStyle="headline1"
        >
          Download the Crater App
        </Text>

        <Flex gridGap={space.xxs}>
          <AppLink buttonType={AppLinkType.android} />
          <AppLink buttonType={AppLinkType.apple} />
        </Flex>
      </Flex>
    </Box>
  );
}
