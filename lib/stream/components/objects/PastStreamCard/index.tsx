import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Grid, Link, Text, Flex, Avatar } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";

interface IProps {
  href: string;
  title: string;
  image: string;
  hostImage?: string;
  time: string;
  hostName?: string;
}

export default function PastStreamCard({
  image,
  title,
  href,
  hostImage,
  hostName,
  time,
}: IProps): JSX.Element {
  const { radii, space, colors } = useTheme();
  const start = DateTime.parse(time);
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

        <Grid
          py={space.xxs}
          gridTemplateColumns="max-content 1fr"
          alignItems="start"
          gridGap={space.xxs}
        >
          <Avatar size={48} image={hostImage} alt={title} />
          <Flex flexDirection="column">
            <Text textStyle="bodyLarge">{title}</Text>
            <Text textStyle="caption" color={colors.slate}>
              {hostName}, {start.toRelative()}
            </Text>
          </Flex>
        </Grid>
      </Box>
    </Link>
  );
}
