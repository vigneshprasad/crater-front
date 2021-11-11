import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Link, Text } from "@/common/components/atoms";

interface IProps {
  href: string;
  title: string;
  image: string;
}

export default function PastStreamCard({
  image,
  title,
  href,
}: IProps): JSX.Element {
  const { radii } = useTheme();
  return (
    <Link href={href}>
      <Box>
        <Box
          position="relative"
          pt="56.25%"
          overflow="hidden"
          borderRadius={radii.xxs}
        >
          <Image src={image} alt={title} layout="fill" />
        </Box>

        <Text>{title}</Text>
      </Box>
    </Link>
  );
}
