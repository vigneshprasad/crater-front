import { useTheme } from "styled-components";

import Image from "next/image";

import { useUser } from "@/auth/hooks";
import { Box, Text, Flex, Link } from "@/common/components/atoms";
import { Logo } from "@/common/components/objects/Logo";

type IProps = {
  showUser?: boolean;
};

function HorizontalNav({ showUser = false }: IProps): JSX.Element {
  const { user } = useUser();
  const { space } = useTheme();
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      py={space.xxs}
      px={space.xs}
    >
      <Link href="/">
        <Logo withText />
      </Link>

      {showUser && (
        <Flex flexDirection="row" alignItems="center">
          <Text mr={space.xxs} textStyle="title">
            {user?.name}
          </Text>
          <Box
            position="relative"
            w={42}
            h={42}
            borderRadius="50%"
            overflow="hidden"
          >
            {user?.photo && (
              <Image
                objectFit="cover"
                src={user.photo}
                layout="fill"
                alt={user.name}
              />
            )}
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default HorizontalNav;
