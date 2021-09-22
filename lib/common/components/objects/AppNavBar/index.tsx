import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";

import { AnimatedBox, Box, Grid } from "../../atoms";
import { Avatar } from "../../atoms/Avatar";
import { Button } from "../../atoms/Button";
import { Logo } from "../Logo";

export default function AppNavBar(): JSX.Element {
  const router = useRouter();
  const { space, borders, colors } = useTheme();
  const { profile, loading } = useAuth();
  const { openModal } = useAuthModal();

  // const handleOnClickUserImage = (): void => {
  //   router.push("/account/");
  // };

  const handleLogoClick = (): void => {
    router.push("//joincrater.club");
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
      <Logo withText onClick={handleLogoClick} />

      <Box />

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

        return <Button variant="nav-button" text="Login" onClick={openModal} />;
      })()}
    </Grid>
  );
}
