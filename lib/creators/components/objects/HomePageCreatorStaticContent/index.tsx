import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Flex, Text } from "@/common/components/atoms";
import GlassBox from "@/common/components/atoms/GlassBox";
import LazyLoadButton from "@/common/components/objects/LazyLoadButton";
import { START_CREATOR_JOURNEY_CALENDLY } from "@/common/constants/url.constants";

import CreatorJourneyCardSwitch from "../CreatorJourneyCardSwitch";

export default function HomePageCreatorStaticContent(): JSX.Element {
  const { space, radii } = useTheme();

  return (
    <Box w="100%" h={[480, 320]} bg="#2E6BE5" borderRadius={radii.xs}>
      <Box
        h="100%"
        position="relative"
        borderRadius={radii.xs}
        overflow="hidden"
      >
        <Image
          src={STATIC_IMAGES.ImageStreamJourney}
          alt="Stream Journey"
          layout="fill"
          objectFit="cover"
          objectPosition="20% 100px"
        />

        <Flex
          h="100%"
          p={[space.xxxs, 36]}
          flexDirection={["column", "row"]}
          alignItems={["start", "flex-end"]}
          gridGap={[space.s, space.xl]}
        >
          <GlassBox
            px={space.xs}
            pt={32}
            pb={space.xxs}
            w={["100%", "fit-content"]}
            flexGrow={1}
          >
            <Flex
              h="100%"
              flexDirection={["column", "row"]}
              justifyContent="space-between"
              gridGap={[space.xs, space.s]}
            >
              <Text
                fontSize={["3.2rem", "4.0rem"]}
                fontWeight={600}
                lineHeight={["3.8rem", "4.8rem"]}
                maxLines={2}
              >
                Start streaming <br />
                on Crater
              </Text>
              <Box alignSelf={["flex-start", "flex-end"]}>
                <a
                  href={START_CREATOR_JOURNEY_CALENDLY}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LazyLoadButton
                    label="Begin Your Journey"
                    iconTransform="rotate(-90deg)"
                  />
                </a>
              </Box>
            </Flex>
          </GlassBox>

          <Box flexGrow={1}>
            <CreatorJourneyCardSwitch />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
