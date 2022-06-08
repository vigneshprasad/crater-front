import styled, { useTheme } from "styled-components";

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
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";

import MenuButton from "../../MenuButton";
import { MenuItem } from "../../MenuButton/MenuItem";

const MenuContainer = styled(Flex)`
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export default function AppNavbar(): JSX.Element {
  const { user, profile, loading } = useAuth();
  const { colors, space, borders, fonts, radii } = useTheme();
  const { openModal } = useAuthModal();
  const router = useRouter();

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
      <Flex gridGap={space.xxs}>
        <Icon icon="Logo" w={108} h={46} />
        <MenuButton
          position="bottom-left"
          items={[
            <MenuItem key="about">
              <a>
                <Text textStyle="body">About Crater</Text>
              </a>
            </MenuItem>,
            <MenuItem key="help">
              <a>
                <Text textStyle="body">Help Center</Text>
              </a>
            </MenuItem>,
            <MenuItem key="whitepaper">
              <a>
                <Flex gridGap={space.xxxxs} alignItems="center">
                  <Text textStyle="body">White Paper</Text>
                  <Icon icon="PopOut" size={20} />
                </Flex>
              </a>
            </MenuItem>,
            <MenuItem key="discord">
              <a>
                <Button
                  label="Community"
                  prefixElement={<Icon icon="Discord" size={20} />}
                />
              </a>
            </MenuItem>,
          ]}
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

      <Flex gridGap={space.xxxs}>
        {(() => {
          if (loading) {
            return <Shimmer borderRadius="50%" size={36} />;
          }

          if (!user || !profile) {
            return (
              <>
                <Button
                  prefixElement={<Icon icon="CameraLive" size={16} />}
                  variant="condensed-dark"
                  label="Go Live"
                />
                <Button variant="condensed" label="Login" onClick={openModal} />
              </>
            );
          }

          return (
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
                  suffixElement={<Icon icon="LogOut" />}
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
          );
        })()}
      </Flex>
    </Flex>
  );
}
