import { useTheme } from "styled-components";

import { Box, Text, Image } from "@/common/components/atoms";

interface IProps {
  stepNumber: string;
  heading: string;
  subheading: string;
  color?: string;
  image: StaticImageData;
}

export default function LeaderboardStepCard({
  stepNumber,
  heading,
  subheading,
  color,
  image,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const textColor = color ?? colors.white[0];
  return (
    <Box
      w={["100%", 360]}
      h={130}
      py={space.xs}
      position="relative"
      bg={colors.white[1]}
      backgroundImage="url(/images/img_starry_bg.png)"
      px={space.xs}
      color={colors.black[1]}
      borderRadius={radii.xxs}
    >
      <Box position="absolute" left={0} bottom={0}>
        <Image src={image} alt="step-image" layout="intrinsic" />
      </Box>

      <Box position="absolute" top={-32} right={16} maxWidth="50%">
        <Text
          textTransform="uppercase"
          color={textColor}
          textAlign="right"
          textStyle="headline5"
        >
          {heading}
        </Text>
        <Text color={textColor} textAlign="right">
          {subheading}
        </Text>
      </Box>

      <Text
        color={textColor}
        textStyle="headline3"
        position="absolute"
        top={-24}
        left={8}
        m="auto auto"
      >
        {stepNumber}
      </Text>
    </Box>
  );
}
