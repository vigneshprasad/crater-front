import { useTime, useTransform } from "framer-motion";
import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Text, AnimatedBox, Flex } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

export default function SimilarStreamsOverlay(): JSX.Element | null {
  const time = useTime();
  const opacity = useTransform(
    time,
    [0, 60000, 60100, 360100, 360200, 420200, 420300],
    [1, 1, 0, 0, 1, 1, 0],
    {
      clamp: false,
    }
  );

  const { space, breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  const learnText = isMobile
    ? "You’re earning LEARN tokens"
    : "You're earning LEARN tokens while watching this stream";

  return (
    <AnimatedBox
      background="linear-gradient(90deg, #121212 60%, rgba(18, 18, 18, 0) 100%)"
      position="absolute"
      top={space.xxxs}
      style={{ opacity }}
      left={space.xxs}
    >
      <Flex
        flexDirection="row"
        paddingTop={[space.xxxxs, space.xxs]}
        paddingBottom={[space.xxxxs, space.xxs]}
        paddingLeft={[space.xxxxs, space.xxs]}
        paddingRight={space.l}
      >
        <Image
          height={20}
          width={20}
          src={STATIC_IMAGES.ImageCoin}
          alt="coin icon"
        />
        <Text fontWeight="500" textStyle="body" paddingLeft={space.xxxs}>
          {learnText}
        </Text>
      </Flex>
    </AnimatedBox>
  );
}
