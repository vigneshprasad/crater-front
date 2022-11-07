import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { PageRoutes } from "@/common/constants/route.constants";
import {
  DISCORD_URL,
  HIRING_URL,
  INSTAGRAM_URL,
  LEARN_MORE_URL,
  LINKEDIN_URL,
} from "@/common/constants/url.constants";

import { Box, Flex, Text, Grid, Image } from "../../atoms";
import IconButton from "../../atoms/IconButton";
import AppLink, { AppLinkType } from "../AppLink";
import LinkText from "../LinkText";

export default function Footer(): JSX.Element {
  const { space, colors } = useTheme();
  const { user } = useAuth();

  return (
    <Grid
      gridRowGap={[space.s, space.xs]}
      gridColumnGap={[space.xxxs, space.s]}
      gridTemplateColumns={[
        "1fr 1fr",
        "max-content repeat(3, max-content) 1fr",
      ]}
      gridTemplateAreas={[
        `
          "logo logo"
          "links contact"
          "follow follow"
          "download download"
        `,
        `"logo links contact follow download"`,
      ]}
    >
      <Box gridArea="logo" w={[130, 200]} justifySelf={["center", "start"]}>
        <Image src="/images/crater_logo_dark_mode.png" alt="Crater" />
      </Box>

      <Flex gridArea="links" flexDirection="column" gridGap={space.xxxs}>
        <Text
          textStyle="captionLarge"
          lineHeight="2.1rem"
          color={colors.textQuartenary}
        >
          Links
        </Text>

        <LinkText
          href={user ? PageRoutes.hub(undefined, "journey") : PageRoutes.join}
        >
          Become a creator
        </LinkText>
        <LinkText href={HIRING_URL}>Work @ Crater</LinkText>
        <LinkText href={LEARN_MORE_URL}>FAQ</LinkText>
      </Flex>

      <Flex gridArea="contact" flexDirection="column" gridGap={space.xxxs}>
        <Text
          textStyle="captionLarge"
          lineHeight="2.1rem"
          color={colors.textQuartenary}
        >
          Contact us
        </Text>
        <LinkText href="tel:+919930474469">+91 9930474469</LinkText>
        <LinkText href="mailto:vivan@crater.club">vivan@crater.club</LinkText>
        <Text textStyle="body" fontWeight={500} lineHeight="2.1rem">
          Wurknet Private Limited <br />
          Shalaka, 204, Juhu Rd, Santacruz West <br />
          Mumbai, Maharashtra 400054
        </Text>
      </Flex>

      <Flex
        gridArea="follow"
        flexDirection="column"
        gridGap={space.xs}
        justifySelf={["center", "start"]}
      >
        <Text
          textStyle="captionLarge"
          lineHeight="2.1rem"
          color={colors.textQuartenary}
          textAlign={["center", "start"]}
        >
          Follow us
        </Text>

        <Flex gridGap={space.xxxs}>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            <IconButton
              variant="flatPrimaryBg"
              icon="Linkedin"
              iconProps={{ fill: true, color: colors.white[0] }}
            />
          </a>

          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <IconButton
              variant="flatPrimaryBg"
              icon="InstagramAlt"
              iconProps={{ fill: true, color: colors.white[0] }}
            />
          </a>

          <a href={DISCORD_URL} target="_blank" rel="noreferrer">
            <IconButton
              variant="flatPrimaryBg"
              icon="Discord"
              iconProps={{ fill: true, color: colors.white[0] }}
            />
          </a>
        </Flex>
      </Flex>

      <Flex
        gridArea="download"
        flexDirection="column"
        gridGap={space.xxxs}
        justifySelf={["center", "flex-end"]}
      >
        <Text
          textStyle="captionLarge"
          lineHeight="2.1rem"
          color={colors.textQuartenary}
          textAlign={["center", "start"]}
        >
          Download the app
        </Text>

        <Flex gridGap={space.xxs}>
          <AppLink buttonType={AppLinkType.android} height={50} />
          <AppLink buttonType={AppLinkType.apple} height={56} />
        </Flex>
      </Flex>

      <Box gridColumn={["1 / span 2", "1 / span 5"]} pt={[0, space.xs]}>
        <Text color={colors.slate} textStyle="small" textAlign="center">
          Copyright 2019 CRATER, All rights reserved <br />
          Copyright 2019 CRATER CLUB, All rights reserved
        </Text>
      </Box>
    </Grid>
  );
}
