import STATIC_IMAGES from "public/images";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Flex, Grid, Text, Box, Span } from "@/common/components/atoms";
import { Modal } from "@/common/components/atoms/v2";
import { Button } from "@/common/components/atoms/v2";
import { WEB3_CRATER_LANDING } from "@/common/constants/url.constants";

import DataItem from "./DataItem";
import useLearnModalContext from "./context";

const StyledBox = styled(Flex)`
  position: relative;
  background: transparent;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    border: 2px solid transparent;
    background: linear-gradient(45deg, #f1616a, #9146ff, #9db3ff, #0d849e)
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export default function LearnNEarnModal(): JSX.Element {
  const { space, colors } = useTheme();
  const { visible, setVisible } = useLearnModalContext();

  return (
    <Modal
      visible={visible}
      maxWidth={["calc(100vw - 16px)", "80vw"]}
      onClose={() => setVisible(false)}
    >
      <Grid
        h="100%"
        px={[space.xxs, space.s]}
        py={space.xs}
        gridTemplateColumns={["1fr", "2fr 1fr"]}
        gridGap={space.xs}
        justifyContent="center"
        alignItems="center"
      >
        <Flex flexDirection="column">
          <Text textStyle="mainHeading">Earn your share of the daily LOOT</Text>
          <Text w="80%" color={colors.textTertiary}>
            Watch streams, co-create content &amp; compete in bounties, to earn
            loyalty tokens.
          </Text>
        </Flex>

        <StyledBox
          w="max-content"
          display={["none", "flex"]}
          alignItems="center"
          gridGap={space.xxxs}
          m="0 auto"
          flex="0"
          py={space.xxxs}
          px={space.xxxs}
        >
          <Box w={24} h={24} position="relative">
            <Image
              src={STATIC_IMAGES.ImageLearnLoot}
              alt="Loot"
              layout="fill"
              objectFit="contain"
            />
          </Box>
          <Text mr={space.xs}>Total Loot: --</Text>
        </StyledBox>

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
            <DataItem icon="StreamColor" label="Time Spent:" rotation={135} />
            <DataItem icon="EyeColor" label="Interactions:" rotation={155} />
            <DataItem icon="TokenColor" label="LEARN Earned:" rotation={205} />
            <DataItem icon="BurnColor" label="LEARN Burned:" rotation={225} />
          </Flex>
        </Grid>

        <Box m="0 auto" w={240}>
          <Image src={STATIC_IMAGES.ImageHyfiPlaceholder} alt="Hyfi Share" />
        </Box>

        <Grid
          gridColumn={["1 / span 1", "1 / span 2"]}
          gridTemplateColumns={["1fr", "max-content 1fr"]}
          gridGap={space.xs}
          alignItems="center"
        >
          <Box gridRow={["2", "1"]}>
            <a href={WEB3_CRATER_LANDING} target="_blank" rel="noreferrer">
              <Button w={["100%", "auto"]} label="Know More" />
            </a>
          </Box>

          <Text textStyle="small" color={colors.textTertiary}>
            On Crater you earn CRT, an unlimited supply loyalty token for
            creating content, watching streams or by competing in bounties.
            <Span fontWeight="600" color={colors.textPrimary}>
              These are converted to LEARN, a limited supply BEP20 token on the
              Binance Smart chain created by Rohas Nagpal.LEARN Token is a BEP20
              token on the{" "}
            </Span>
          </Text>
        </Grid>
      </Grid>
    </Modal>
  );
}
