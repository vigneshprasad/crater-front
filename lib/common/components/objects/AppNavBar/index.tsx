import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { PageRoutes } from "@/common/constants/route.constants";
import useAsideNavState from "@/common/hooks/ui/useAsideNavState";

import { AnimatedBox, Flex, Box, Grid, Link, Text } from "../../atoms";
import { Avatar } from "../../atoms/Avatar";
import { Button } from "../../atoms/Button";
import IconButton from "../../atoms/IconButton";
import { Logo } from "../Logo";

export default function AppNavBar(): JSX.Element {
  const router = useRouter();
  const { space, borders, colors } = useTheme();
  const { profile, loading } = useAuth();
  const { openModal } = useAuthModal();
  const { isMobile, toggleNavBar } = useAsideNavState();

  // const handleOnClickUserImage = (): void => {
  //   router.push("/account/");
  // };

  const handleLogoClick = (): void => {
    router.push(PageRoutes.home);
  };

  return (
    <Grid
      bg={colors.black[5]}
      borderBottom={`2px solid ${borders.main}`}
      px={[space.xxs, space.xs]}
      py={[space.xxxs]}
      gridTemplateColumns="min-content 1fr min-content"
      alignItems="center"
    >
      <Flex>
        {isMobile && (
          <IconButton
            variant="flatNoBg"
            icon="Menu"
            iconProps={{ color: colors.white[0], fill: true }}
            onClick={toggleNavBar}
          />
        )}
        <Logo withText onClick={handleLogoClick} />
      </Flex>

      <Box />

      <Grid
        gridAutoFlow="column"
        gridAutoColumns="max-content"
        alignItems="center"
        gridGap={space.xxs}
      >
        <Grid
          display={["none", "block"]}
          gridAutoFlow="column"
          gridGap={space.xxs}
        >
          <Link href="//joincrater.club/" boxProps={{ target: "_blank" }}>
            <Text color={colors.accent} textStyle="button">
              About
            </Text>
          </Link>
        </Grid>

        {(() => {
          if (loading) {
            return (
              <AnimatedBox
                size={32}
                borderRadius="50%"
                animate={{ background: ["#353535", "#a8a8a8"] }}
                transition={{ flip: Infinity, duration: 1 }}
              />
            );
          }

          if (profile) {
            return (
              <Box>
                <Avatar
                  alt={profile.name ?? "username"}
                  size={32}
                  image={profile.photo}
                />
              </Box>
            );
          }

          return (
            <Button variant="nav-button" text="Login" onClick={openModal} />
          );
        })()}
      </Grid>
    </Grid>
  );
}
