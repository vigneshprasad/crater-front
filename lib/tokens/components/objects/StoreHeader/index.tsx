import { useTheme } from "styled-components";

import { Box, Grid, Icon, Image, Text } from "@/common/components/atoms";

export default function StoreHeader(): JSX.Element {
  const { space, fonts, radii } = useTheme();

  return (
    <Grid gridAutoFlow="column" gridTemplateColumns="380px 1fr 1fr">
      <Box>
        <Text
          maxLines={3}
          fontSize="3.6rem"
          lineHeight="4.6rem"
          fontWeight={500}
          fontFamily={fonts.heading}
          pb={space.xxxs}
        >
          Discover content and art by Creators
        </Text>
        <Icon icon="Sparkle" size={32} />
        <Box
          mt={space.xxxs}
          w={334}
          p={space.xs}
          borderRadius={radii.s}
          background="rgba(79, 119, 167, 0.16)"
        >
          <Text textStyle="captionLarge" lineHeight="2.4rem">
            Crater&apos;s digital marketplace for art, content and more. Buy,
            sell and discover exclusive digital assets.
          </Text>
        </Box>
      </Box>
      <Box position="relative">
        <Box w={535} h={432} position="absolute" bottom={-10}>
          <Image src="/images/img_astronaut_store.png" alt="Store Img" />
        </Box>
      </Box>
    </Grid>
  );
}
