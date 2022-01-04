import { useAnimation } from "framer-motion";
import { Profile, User } from "next-auth";
import { useState } from "react";
import styled, { useTheme } from "styled-components";

import { Logout } from "@/auth/utils";
import { USER_NAV_DROPDOWN_ITEMS } from "@/common/constants/ui.constants";

import { AnimatedBox, Avatar, Box, Grid, Icon, Text, Link } from "../../atoms";

interface IProps {
  profile: Profile;
  user: User;
}

const ButtonContainer = styled(Grid)`
  &:hover {
    background: ${({ theme }) => theme.colors.black[0]};
  }
`;

const MenuItem = styled(Grid)`
  &:hover {
    background: ${({ theme }) => theme.colors.black[0]};
  }
`;

const containerVariants = {
  closed: {
    padding: 0,
    height: 0,
    width: 0,
    transitionEnd: {
      display: "none",
    },
    transition: { when: "afterChildren" },
  },
  expanded: {
    top: 0,
    right: 0,
    height: "auto",
    display: "block",
    width: "auto",
  },
};

const contentVariants = {
  closed: {
    opacity: 0,
  },
  expanded: {
    opacity: 1,
  },
};

export default function UserDropdown({ profile, user }: IProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const animate = useAnimation();
  const { colors, space, radii, zIndices } = useTheme();
  const { name, photo } = profile;
  const { email } = user;

  const handleButtonClick = (): void => {
    animate.start("expanded");
    setVisible(true);
  };

  const handleOverlayClick = (): void => {
    animate.start("closed");
    setVisible(false);
  };

  const handleLogout = async (): Promise<void> => {
    await Logout();
  };

  return (
    <>
      {visible && (
        <Box
          position="fixed"
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={zIndices.overlay}
          onClick={handleOverlayClick}
        />
      )}
      <Box cursor="pointer" position="relative">
        <ButtonContainer
          borderRadius={radii.xxxs}
          py={4}
          px={space.xxxs}
          gridAutoFlow="column"
          alignItems="center"
          onClick={handleButtonClick}
        >
          <Avatar size={32} image={photo} />
          <Icon size={18} icon="MoreVertical" color={colors.white[0]} fill />
        </ButtonContainer>

        <AnimatedBox
          layout
          borderRadius={radii.xxs}
          initial="closed"
          position="absolute"
          animate={animate}
          variants={containerVariants}
          bg={colors.black[4]}
          zIndex={zIndices.modal}
        >
          <AnimatedBox p={space.xxs} variants={contentVariants}>
            <Grid
              gridGap={space.xxxs}
              gridAutoFlow="column"
              alignItems="center"
              justifyContent="start"
              mb={space.xxs}
            >
              <Avatar size={48} image={photo} />
              <Box>
                <Text textStyle="label">{name}</Text>
                <Text color={colors.slate}>{email}</Text>
              </Box>
            </Grid>

            <Box mb={space.xxs} h={2} bg={colors.whiteAlpha} />

            {USER_NAV_DROPDOWN_ITEMS.map((item) => {
              if (item.key === "logout") {
                return (
                  <MenuItem
                    key={item.key}
                    borderRadius={radii.xxxs}
                    px={space.xxxs}
                    py={space.xxxs}
                    gridTemplateColumns="max-content 1fr"
                    gridGap={space.xxs}
                    onClick={handleLogout}
                  >
                    <Icon color={colors.white[0]} icon={item.icon} />
                    <Text textStyle="caption">{item.label}</Text>
                  </MenuItem>
                );
              }

              if (item.key == "about") {
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MenuItem
                      borderRadius={radii.xxxs}
                      px={space.xxxs}
                      py={space.xxxs}
                      gridTemplateColumns="max-content 1fr"
                      gridGap={space.xxs}
                    >
                      <Icon color={colors.white[0]} icon={item.icon} />
                      <Text textStyle="caption">{item.label}</Text>
                    </MenuItem>
                  </a>
                );
              }

              return (
                <Link key={item.key} href={item.url} prefetch={false}>
                  <MenuItem
                    borderRadius={radii.xxxs}
                    px={space.xxxs}
                    py={space.xxxs}
                    gridTemplateColumns="max-content 1fr"
                    gridGap={space.xxs}
                  >
                    <Icon color={colors.white[0]} icon={item.icon} />
                    <Text textStyle="caption">{item.label}</Text>
                  </MenuItem>
                </Link>
              );
            })}
          </AnimatedBox>
        </AnimatedBox>
      </Box>
    </>
  );
}
