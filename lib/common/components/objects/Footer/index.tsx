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

import { Box, Flex, Text, Grid } from "../../atoms";
import IconButton from "../../atoms/IconButton";
import LinkText from "../LinkText";

export default function Footer(): JSX.Element {
  const { space, borders, colors } = useTheme();
  const { user } = useAuth();

  return (
    <Grid
      mt={space.xs}
      px={[space.xxs, space.s]}
      py={space.xs}
      gridRowGap={space.xs}
      gridTemplateColumns={["1fr", "1fr 1fr 1fr"]}
      borderTop={`2px solid ${borders.main}`}
    >
      <Flex flexDirection="column" gridGap={space.xxxs}>
        <Text mb={space.xxs} textStyle="title">
          Links
        </Text>

        <LinkText href={user ? PageRoutes.hub("journey") : PageRoutes.join}>
          Become a creator
        </LinkText>
        <LinkText href={HIRING_URL}>Work @ Crater</LinkText>
        <LinkText href={LEARN_MORE_URL}>FAQ</LinkText>
      </Flex>
      <Flex flexDirection="column" gridGap={space.xxxs}>
        <Text mb={space.xxs} textStyle="title">
          Contact us
        </Text>
        <Box>
          <Text textStyle="small">Phone</Text>
          <LinkText href="tel:+919930474469">+91 9930474469</LinkText>
        </Box>

        <Box>
          <Text textStyle="small">Email</Text>
          <LinkText href="mailto:vivan@crater.club">vivan@crater.club</LinkText>
        </Box>

        <Box>
          <Text textStyle="small">Company Details</Text>
          <Text color={colors.slate}>
            Wurknet Private Limited <br />
            Shalaka, 204, Juhu Rd, Santacruz West <br />
            Mumbai, Maharashtra 400054
          </Text>
        </Box>
      </Flex>

      <Box>
        <Text mb={space.xxs} textStyle="title">
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
      </Box>

      <Box
        gridColumn={["1", "1 / span 3"]}
        py={space.xs}
        borderTop={`2px solid ${borders.main}`}
      >
        <Text color={colors.slate} textStyle="small" textAlign="center">
          All rights reserved Wurknet Private Limited
        </Text>
      </Box>
    </Grid>
  );
}
