import { useTheme } from "styled-components";

import { Box, Flex, Text } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import SocialShareButtons from "@/common/components/objects/SocialShareButtons";

export default function StreamShareSection(): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <Box as="section" bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Box p={space.xxs} background={colors.primaryLight}>
        <Text color={colors.textSecondary} textStyle="cardHeader">
          Share this stream
        </Text>
      </Box>
      <Box p={space.xxs}>
        <Text color={colors.textSecondary} textStyle="body">
          Copy stream link
        </Text>

        <Flex
          borderRadius={radii.xxxxs}
          my={space.xxxs}
          bg={colors.primaryBackground}
          py={space.xxxxs}
          px={space.xxxs}
          alignItems="center"
        >
          <Text textStyle="body" flex="1">
            crater.com/stream/12003...
          </Text>
          <IconButton icon="ContentCopy" />
        </Flex>

        <Box h={1} bg={colors.black[0]} />

        <Text my={space.xxxs} color={colors.textSecondary} textStyle="body">
          Share on social media
        </Text>
        <Flex flexDirection="column" gridGap={space.xxxs}>
          <SocialShareButtons w="100%" label="LinkedIn" icon="Linkedin" />
          <SocialShareButtons w="100%" label="Twitter" icon="Twitter" />
          <SocialShareButtons w="100%" label="Whatsapp" icon="Whatsapp" />
        </Flex>
      </Box>
    </Box>
  );
}
