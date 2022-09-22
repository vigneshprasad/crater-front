import STATIC_IMAGES from "public/images";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Box,
  BoxProps,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { START_CREATOR_JOURNET_CALENDLY } from "@/common/constants/url.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

const GradientScrollUpBox = styled(Box)<BoxProps>`
  position: relative;
  position: relative;
  background: ${(props) => props.theme.colors.primaryDark};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 1px solid transparent;
    background: linear-gradient(65.32deg, #f1616a, #9146ff, #9db3ff, #0d849e)
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  /* &:hover {
    background: ${(props) => props.theme.colors.primaryLight};
    cursor: pointer;
  } */
`;

export default function SellOnCraterStatic(): JSX.Element | null {
  const { space, colors, breakpoints } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const steps: {
    image: StaticImageData;
    title: string;
    description: string;
    button?: boolean;
  }[] = [
    {
      image: STATIC_IMAGES.BecomeACreator,
      title: "Become a Creator",
      description: `If you are a budding creator, Crater is the place to start.
      Becoming a Creator on Crater is the first step to building your
      community.`,
      button: true,
    },
    {
      image: STATIC_IMAGES.Stream,
      title: "Stream & get discovered",
      description: `People come to crater to tune into content related to finance, 
      design, Web 3, marketing & other professional fields. Get your name out there 
      with your streams.`,
    },
    {
      image: STATIC_IMAGES.Sale,
      title: "List your sale",
      description: `Host private auctions and sales for your audience & get the price 
      for everything from the art you create on a stream to the discord community that 
      you are building.`,
    },
  ];

  const startJourneyBtn = (
    <Link
      href={START_CREATOR_JOURNET_CALENDLY}
      boxProps={{
        target: "_blank",
        w: "fit-content",
      }}
    >
      <Button
        mt={[0, 34]}
        label="Start your journey"
        w={200}
        h={44}
        display="flex"
        alignItems="center"
        justifyContent="center"
        suffixElement={<Icon icon="ChevronRight" size={20} />}
      />
    </Link>
  );

  if (isMobile === undefined) return null;

  return (
    <Box pl={[space.xs, 0]}>
      <Flex pb={[space.xs, space.s]} gridGap={space.xs} alignItems="center">
        <Text textStyle="gradientHeading">Sell on Crater</Text>
        <Flex
          flex={1}
          h={4}
          background="linear-gradient(90deg, #292929 8.86%, rgba(27, 27, 27, 0) 80.91%)"
        />
      </Flex>
      {!isMobile ? (
        <Grid
          w="80%"
          gridTemplateColumns="1fr 1fr 1fr"
          gridGap={space.m}
          overflowX="scroll"
        >
          {steps.map(({ image, title, description }, index) => (
            <Flex flexDirection="column" gridGap={24} key={index}>
              <Image src={image} alt={title} boxProps={{ w: 64, h: 64 }} />
              <Box>
                <Text textStyle="headline5" fontWeight={600}>
                  {title}
                </Text>
                <Text
                  textStyle="menu"
                  pt={space.xxxxxs}
                  color={colors.textTertiary}
                  maxWidth={260}
                  maxLines={5}
                >
                  {description}
                </Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      ) : (
        <Box>
          <Swiper
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {steps.map(({ image, title, description, button }, index) => (
              <SwiperSlide key={index}>
                <Flex flexDirection="column" gridGap={space.xxs}>
                  <Image
                    src={image}
                    alt={title}
                    boxProps={{
                      position: "relative",
                      w: 42,
                      h: 42,
                    }}
                  />
                  <Box>
                    <Text textStyle="headline5" fontWeight={600}>
                      {title}
                    </Text>
                    <Text
                      textStyle="menu"
                      pt={space.xxxxxs}
                      color={colors.textTertiary}
                      maxWidth={260}
                      maxLines={5}
                    >
                      {description}
                    </Text>
                  </Box>
                  {button && startJourneyBtn}
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
          <Flex pt={space.xs} gridGap={space.xxxxxs}>
            {Array(steps.length)
              .fill("")
              .map((_, index) => (
                <Box
                  w={6}
                  h={6}
                  bg={colors.textPrimary}
                  borderRadius="50%"
                  opacity={index === activeIndex ? 1 : 0.25}
                  key={index}
                />
              ))}
          </Flex>
        </Box>
      )}

      {!isMobile && startJourneyBtn}

      <GradientScrollUpBox
        ml="auto"
        mr={[space.xxxs, 0]}
        mt={[0, space.s]}
        w={[44, 72]}
        h={[44, 72]}
        borderRadius="50%"
        boxShadow="0px 0px 16px #000000"
      >
        <Box
          position="absolute"
          w={[16, 32]}
          h={[16, 32]}
          top={[15, 20]}
          left={[15, 20]}
        >
          <Image
            src="/images/img_up_arrow.png"
            alt="Scroll up"
            boxProps={{ position: "relative" }}
          />
        </Box>
      </GradientScrollUpBox>
    </Box>
  );
}
