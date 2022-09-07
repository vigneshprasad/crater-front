import STATIC_IMAGES from "public/images";
import styled, { useTheme } from "styled-components";

import {
  Box,
  Grid,
  Icon,
  Image,
  Span,
  Text,
  TextProps,
} from "@/common/components/atoms";

const StyledSpan = styled(Span)<TextProps>`
  background: linear-gradient(65.32deg, #f1616a, #9146ff, #9db3ff, #0d849e);

  backgroundclip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  textfillcolor: transparent;
`;

export default function StoreHeader(): JSX.Element {
  const { space, fonts, radii } = useTheme();

  return (
    <Grid
      gridAutoFlow="column"
      gridTemplateColumns="1fr 535px 1fr"
      gridGap={space.s}
    >
      <Box>
        <Text
          maxLines={3}
          fontSize="3.6rem"
          lineHeight="4.6rem"
          fontWeight={400}
          fontFamily={fonts.heading}
          pb={space.xxxs}
          w={368}
        >
          Discover, <StyledSpan fontWeight={500}>Buy</StyledSpan> and{" "}
          <StyledSpan fontWeight={500}>Sell</StyledSpan> Art &amp; Digital Goods
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
            Crater&apos;s live marketplace for art, content, communities and
            more. Buy, sell and discover exclusive assets created by Creators.
          </Text>
        </Box>
      </Box>
      <Box position="relative" alignSelf="end" justifySelf="start">
        <Box w={535} h={430} position="absolute" left={-20} bottom={-50}>
          <Image src={STATIC_IMAGES.ImageStoreHeader} alt="Store Img" />
        </Box>
      </Box>
      <Box w={200} h={200} justifySelf="center" alignSelf="center">
        <Image src="/images/img_store_header_arrow.png" alt="Store Img" />
      </Box>
    </Grid>
  );
}
