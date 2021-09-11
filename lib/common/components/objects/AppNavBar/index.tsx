import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { useUser } from "@/auth/hooks";

import { Avatar, Box, Grid } from "../../atoms";
import { Button } from "../../atoms/Button";
import { Logo } from "../Logo";

export default function AppNavBar(): JSX.Element {
  const router = useRouter();
  const { space, borders, colors } = useTheme();
  const { user } = useUser();

  const handleOnClickUserImage = (): void => {
    router.push("/home/account/");
  };

  const handleLogoClick = (): void => {
    router.push("/home/clubs");
  };

  return (
    <Grid
      bg={colors.black[1]}
      borderBottom={`1px solid ${borders.main}`}
      px={[space.xs]}
      py={[space.xxxs]}
      gridTemplateColumns="min-content 1fr min-content"
      alignItems="center"
    >
      <Logo withText onClick={handleLogoClick} />
      <Box />
      {user ? (
        <Box>
          <Avatar
            onClick={handleOnClickUserImage}
            alt={user.name ?? "username"}
            size={32}
            image={user.photo}
          />
        </Box>
      ) : (
        <Button variant="nav-button" text="Login" />
      )}
    </Grid>
  );
}
