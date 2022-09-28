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
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

const StyledSpan = styled(Span)<TextProps>`
  background: linear-gradient(65.32deg, #f1616a, #9146ff, #9db3ff, #0d849e);

  backgroundclip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  textfillcolor: transparent;
`;

export default function StoreHeader(): JSX.Element | null {
  const { space, fonts, radii, breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Grid
      gridAutoFlow="column"
      gridTemplateColumns={["minmax(0, 1fr)", "1fr 535px 1fr"]}
      gridTemplateRows={["1fr max-content", "1fr"]}
      gridGap={[space.xs, space.s]}
    >
      <Box position="relative">
        <Text
          maxLines={isMobile ? undefined : 3}
          fontSize={["2.4rem", "3.6rem"]}
          lineHeight={["3.0rem", "4.6rem"]}
          fontWeight={400}
          fontFamily={fonts.heading}
          pb={space.xxxs}
          w={["80%", 368]}
        >
          Discover, <StyledSpan fontWeight={500}>Buy</StyledSpan> and{" "}
          <StyledSpan fontWeight={500}>Sell</StyledSpan> Art &amp; Digital Goods
        </Text>
        <Icon icon="Sparkle" size={32} />
        <Box
          mt={space.xxxs}
          w={[315, 334]}
          p={space.xs}
          borderRadius={radii.s}
          background="rgba(79, 119, 167, 0.16)"
        >
          <Text textStyle="captionLarge" lineHeight="2.4rem">
            Crater&apos;s live marketplace for art, content, communities and
            more. Buy, sell and discover exclusive assets created by Creators.
          </Text>
        </Box>
        {isMobile && (
          <Box
            w={340}
            h={232}
            position="absolute"
            top={-70}
            left={150}
            zIndex={-1}
            opacity={0.6}
          >
            <Image src="/images/img_astronaut_store.png" alt="Store Img" />
          </Box>
        )}
      </Box>
      {!isMobile && (
        <Box position="relative" alignSelf="end" justifySelf="start">
          <Box w={535} h={430} position="absolute" left={-20} bottom={-50}>
            <Image src={STATIC_IMAGES.ImageStoreHeader} alt="Store Img" />
          </Box>
        </Box>
      )}
      <Box w={200} h={200} justifySelf="center" alignSelf="center">
        <Image src="/images/img_store_header_arrow.png" alt="Store Img" />
      </Box>
    </Grid>
  );
}
