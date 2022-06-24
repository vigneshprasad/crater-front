import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Flex, Grid, Modal, Text, Box, Span } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { WEB3_CRATER_LANDING } from "@/common/constants/url.constants";

import DataItem from "./DataItem";
import useLearnModalContext from "./context";

export default function LearnNEarnModal(): JSX.Element {
  const { space, colors } = useTheme();
  const { visible, setVisible } = useLearnModalContext();

  return (
    <Modal visible={visible} maxWidth="80vw" onClose={() => setVisible(false)}>
      <Grid
        h="100%"
        px={space.xs}
        py={space.xs}
        gridTemplateRows="max-content 1fr max-content"
      >
        <Flex gridColumn="1 / span 2" flexDirection="column">
          <Text textStyle="mainHeading">
            Watch Web3 Content and earn tokens
          </Text>
          <Text w="80%" color={colors.textTertiary}>
            Crater has partnered with HyFi to give you tokens while you learn
            about Web3.
          </Text>
        </Flex>
        <Grid
          display={["none", "grid"]}
          gridTemplateColumns="1fr 1fr"
          alignItems="center"
        >
          <Box position="relative" pt="100%">
            <Image
              layout="fill"
              src={STATIC_IMAGES.ImageVisorMonkey}
              alt="Visor Monkey"
            />
          </Box>
          <Flex gridGap={space.xs} flexDirection="column">
            <DataItem
              icon="StreamColor"
              label="Your Stream Time:"
              rotation={135}
            />
            <DataItem icon="EyeColor" label="Your Watch Time:" rotation={155} />
            <DataItem
              icon="TokenColor"
              label="Learn Tokens Earned:"
              rotation={205}
            />
            <DataItem
              icon="BurnColor"
              label="Learn Tokens Burned:"
              rotation={225}
            />
          </Flex>
        </Grid>

        <Grid>
          <Box m="auto auto" w={240}>
            <Text textAlign="center">Daily Bounty: --</Text>
            <Image src={STATIC_IMAGES.ImageHyfiPlaceholder} alt="Hyfi Share" />
          </Box>
        </Grid>

        <Grid
          gridTemplateColumns={["1fr", "max-content 1fr"]}
          gridGap={space.xs}
          alignItems="center"
          gridColumn="1 / span 2"
        >
          <Box gridRow={["2", "1"]}>
            <a href={WEB3_CRATER_LANDING} target="_blank" rel="noreferrer">
              <Button w={["100%", "auto"]} label="Know More" />
            </a>
          </Box>

          <Text textStyle="small" color={colors.textTertiary}>
            LEARN Token is a BEP20 token on the{" "}
            <Span fontWeight="600" color={colors.textPrimary}>
              Binance Smart Chain by Rohas Nagpal
            </Span>
            . The tokens earned are transferred automatically{" "}
            <Span fontWeight="600" color={colors.textPrimary}>
              every Friday
            </Span>{" "}
            to your{" "}
            <Span fontWeight="600" color={colors.textPrimary}>
              meta mask wallet
            </Span>
            , which you can update in your account settings
          </Text>
        </Grid>
      </Grid>
    </Modal>
  );
}
