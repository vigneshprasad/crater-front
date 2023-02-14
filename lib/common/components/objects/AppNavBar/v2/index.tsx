import STATIC_IMAGES from "public/images";
import styled, { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Logout } from "@/auth/utils";
import {
  Avatar,
  Flex,
  Icon,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import useAsideNavState from "@/common/hooks/ui/useAsideNavState";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import useLearnModalContext from "@/stream/components/objects/LearnNEarnModal/context";

import GlobalSearch from "../../GlobalSearch";
import MenuButton from "../../MenuButton";
import { MenuItem } from "../../MenuButton/MenuItem";
import { NAV_ABOUT_LINKS } from "./contants";

const MenuContainer = styled(Flex)`
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export default function AppNavbar(): JSX.Element {
  const { user, profile, loading } = useAuth();
  const { colors, space, borders, fonts, radii, breakpoints } = useTheme();
  const { openModal } = useAuthModal();
  const { setOpened } = useAsideNavState();
  const router = useRouter();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);
  const { setVisible } = useLearnModalContext();

  return (
    <Flex
      px={space.xxxs}
      h={64}
      alignItems="center"
      justifyContent="space-between"
      gridArea="navbar"
      bg={colors.primaryBackground}
      borderBottom={`1px solid ${borders.primary}`}
    >
      <Flex gridGap={[space.xxxxs, space.xxs]} alignItems="center">
        <IconButton
          display={["inline-block", "none"]}
          icon="Hamburger"
          onClick={() => setOpened(true)}
        />
        <Link href={PageRoutes.home}>
          <Icon icon="Logo" w={108} h={46} />
        </Link>

        <MenuButton
          containerProps={{ display: ["none", "block"] }}
          position="bottom-left"
          items={NAV_ABOUT_LINKS.map(({ key, route, label, suffixElement }) => (
            <a href={route} key={key} target="_blank" rel="noreferrer">
              <MenuItem label={label} suffixElement={suffixElement} />
            </a>
          ))}
        >
          <MenuContainer
            p="4px 4px 4px 12px"
            borderRadius={radii.xxxxs}
            alignItems="center"
            gridGap={space.xxxxs}
          >
            <Text fontFamily={fonts.heading} fontSize="1.4rem">
              About
            </Text>
            <Icon size={20} icon="MoreVertical" />
          </MenuContainer>
        </MenuButton>
      </Flex>

      {!isMobile && <GlobalSearch />}

      <Flex gridGap={space.xxxs} alignItems="center">
        {(() => {
          if (loading) {
            return <Shimmer borderRadius="50%" size={36} />;
          }

          if (!user || !profile) {
            return (
              <>
                <Button variant="condensed" label="Login" onClick={openModal} />
              </>
            );
          }

          return (
            <>
              <Button
                prefixElement={
                  <Image
                    height={24}
                    width={24}
                    src={STATIC_IMAGES.ImageCoin}
                    alt="coin icon"
                  />
                }
                variant="gradient-border"
                label={isMobile ? "Earn" : "Learn and Earn"}
                onClick={() => setVisible(true)}
              />

              <MenuButton
                items={[
                  <Link key="account" href={PageRoutes.account}>
                    <MenuItem label="Account" />
                  </Link>,
                  <MenuItem
                    onClick={async () => {
                      await Logout();
                      router.reload();
                    }}
                    label="Logout"
                    key="logout"
                    suffixElement={<Icon icon="LogOut" size={20} />}
                  />,
                ]}
                position="bottom-right"
              >
                <MenuContainer
                  borderRadius={radii.xxxxs}
                  p="4px 4px 4px 8px"
                  alignItems="center"
                >
                  <Avatar size={36} image={profile.photo} />
                  <Icon size={20} icon="MoreVertical" />
                </MenuContainer>
              </MenuButton>
            </>
          );
        })()}
      </Flex>
    </Flex>
  );
}
