import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { useProfile } from "@/auth/hooks";

import { Avatar, Box, Grid } from "../../atoms";
import { Button } from "../../atoms/Button";
import { Logo } from "../Logo";

export default function AppNavBar(): JSX.Element {
  const router = useRouter();
  const { space, borders, colors } = useTheme();
  const { profile } = useProfile();

  const handleOnClickUserImage = (): void => {
    router.push("/account/");
  };

  const handleLogoClick = (): void => {
    router.push("/");
  };

  return (
    <Grid
      bg={colors.black[1]}
      borderBottom={`2px solid ${borders.main}`}
      px={[space.xs]}
      py={[space.xxxs]}
      gridTemplateColumns="min-content 1fr min-content"
      alignItems="center"
    >
      <Logo withText onClick={handleLogoClick} />

      <Box />
      {profile ? (
        <Box cursor="pointer" onClick={handleOnClickUserImage}>
          <Avatar
            alt={profile.name ?? "username"}
            size={32}
            image={profile.photo}
          />
        </Box>
      ) : (
        <Button variant="nav-button" text="Login" />
      )}
    </Grid>
  );
}
