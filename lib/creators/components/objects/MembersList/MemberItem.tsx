import Image from "next/image";

import { Flex, Box, Text } from "@/common/components/atoms";
import { theme } from "@/common/theme";

export type IMemberItemProps = {
  image?: string;
  name?: string;
};

const { space } = theme;

export const MemberItem = ({ name, image }: IMemberItemProps) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      {image && (
        <Box
          overflow="hidden"
          h={56}
          w={56}
          position="relative"
          borderRadius="50%"
          mb={space.xxs}
        >
          <Image objectFit="cover" layout="fill" src={image} alt="user" />
        </Box>
      )}
      {name && (
        <Text textAlign="center" textStyle="title">
          {name}
        </Text>
      )}
      <Text textAlign="center">Founder</Text>
    </Flex>
  );
};
