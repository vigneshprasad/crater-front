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
import LinkText from "../LinkText";

export default function Footer(): JSX.Element {
  const { space, colors } = useTheme();
  const { user } = useAuth();

  return (
    <Grid
      mt={space.xs}
      pt={space.s}
      gridRowGap={space.xs}
      gridColumnGap={space.m}
      gridTemplateColumns={["1fr", "1fr 1fr 1fr 1fr"]}
      borderTop="1px solid #545454"
    >
      <Box w={229} justifySelf={["center", "start"]}>
        <Image src="/images/crater_logo_dark_mode.png" alt="Crater" />
      </Box>

      <Flex flexDirection="column" gridGap={space.xxxs}>
        <Text
          pb={space.xxxxs}
          textStyle="small"
          borderBottom="1px solid #C4C4C4"
          textTransform="uppercase"
        >
          Links
        </Text>

        <LinkText href={user ? PageRoutes.hub("journey") : PageRoutes.join}>
          Become a creator
        </LinkText>
        <LinkText href={HIRING_URL}>Work @ Crater</LinkText>
        <LinkText href={LEARN_MORE_URL}>FAQ</LinkText>
      </Flex>
      <Flex flexDirection="column" gridGap={space.xxxs}>
        <Text
          pb={space.xxxxs}
          textStyle="small"
          borderBottom="1px solid #C4C4C4"
          textTransform="uppercase"
        >
          Contact us
        </Text>
        <LinkText href="tel:+919930474469">+91 9930474469</LinkText>
        <LinkText href="mailto:vivan@crater.club">vivan@crater.club</LinkText>
        <Text
          textStyle="body"
          color={colors.accentLight}
          fontWeight={500}
          lineHeight="2.1rem"
        >
          Wurknet Private Limited <br />
          Shalaka, 204, Juhu Rd, Santacruz West <br />
          Mumbai, Maharashtra 400054
        </Text>
      </Flex>

      <Flex flexDirection="column" gridGap={space.xxxs}>
        <Text
          pb={space.xxxxs}
          textStyle="small"
          borderBottom="1px solid #C4C4C4"
          textTransform="uppercase"
        >
          Follow us
        </Text>

        <Flex gridGap={space.xxxs}>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            <IconButton
              variant="roundSmall"
              icon="Linkedin"
              iconProps={{ fill: true, color: colors.white[0] }}
            />
          </a>

          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <IconButton
              variant="roundSmall"
              icon="Instagram"
              iconProps={{ fill: true, color: colors.white[0] }}
            />
          </a>

          <a href={DISCORD_URL} target="_blank" rel="noreferrer">
            <IconButton
              variant="roundSmall"
              icon="Discord"
              iconProps={{ fill: true, color: colors.white[0] }}
            />
          </a>
        </Flex>
      </Flex>

      <Box
        gridColumn={["1", "1 / span 4"]}
        pt={space.xs}
        borderTop="1px solid #545454"
      >
        <Text color={colors.slate} textStyle="small" textAlign="center">
          Copyright 2019 CRATER, All rights reserved <br />
          Copyright 2019 CRATER CLUB, All rights reserved
        </Text>
      </Box>
    </Grid>
  );
}
