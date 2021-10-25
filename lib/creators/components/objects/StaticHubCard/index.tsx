import { useTheme } from "styled-components";

import Image from "next/image";

import { Card, Box, Text } from "@/common/components/atoms";

interface IProps {
  heading?: string;
  image: StaticImageData;
  description?: string;
}

export default function StaticHubCard({
  heading,
  image,
  description,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();
  return (
    <Card
      overflow="hidden"
      containerProps={{
        display: "grid",
        px: 0,
        py: 0,
        pb: space.xs,
      }}
    >
      <Box position="relative" h={140}>
        <Image
          objectPosition="top right"
          objectFit="contain"
          src={image}
          layout="fill"
          alt="card1"
        />
      </Box>
      <Box px={space.xxs}>
        {heading && (
          <Text mb={space.xxxs} textStyle="title">
            {heading}
          </Text>
        )}
        {description && <Text color={colors.white[1]}>{description}</Text>}
      </Box>
    </Card>
  );
}
