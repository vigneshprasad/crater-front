import DEFAULT_IMAGE from "public/images/img_default_avatar.png";

import Image from "next/image";

import { Flex, Box, Text } from "@/common/components/atoms";
import { theme } from "@/common/theme";

export type IMemberItemProps = {
  image?: string;
  name?: string;
};

const { space } = theme;

export function MemberItem({ name, image }: IMemberItemProps): JSX.Element {
  const src = !image || image === null ? DEFAULT_IMAGE : image;
  return (
    <Flex flexDirection="column" alignItems="center">
      <Box
        overflow="hidden"
        h={56}
        w={56}
        position="relative"
        borderRadius="50%"
        mb={space.xxs}
      >
        <Image objectFit="cover" layout="fill" src={src as string} alt="user" />
      </Box>
      {name && (
        <Text textAlign="center" textStyle="title">
          {name}
        </Text>
      )}
      <Text textAlign="center">Founder</Text>
    </Flex>
  );
}
