import { useTheme } from "styled-components";

import Image from "next/image";

import { AnimatedBox, Box, Text } from "../../atoms";
import { IconButton } from "../../atoms/v2";

export interface NotificationLargeProps {
  title?: string;
  description?: string;
  onClose?: () => void;
  photo?: string | StaticImageData;
}

export function NotficationLarge({
  title,
  description,
  photo,
}: NotificationLargeProps): JSX.Element {
  const { colors, radii, space } = useTheme();
  return (
    <AnimatedBox
      initial={{
        y: 100,
        opacity: 0,
        display: "none",
      }}
      animate={{
        y: 0,
        display: "block",
        opacity: 1,
      }}
    >
      <Box
        position="relative"
        maxWidth={380}
        bg={colors.primaryDark}
        border={`1px solid ${colors.secondaryLight}`}
        borderRadius={radii.xxxxs}
      >
        {photo && (
          <Box h={240} position="relative">
            <Image src={photo} layout="fill" alt={title} objectFit="cover" />
          </Box>
        )}
        <Box py={space.s} px={36}>
          {title && (
            <Text
              textAlign="center"
              m="0 auto"
              fontSize="1.6rem"
              fontWeight="600"
              color={colors.textPrimary}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              m="0 auto"
              textAlign="center"
              fontSize="1.4rem"
              fontWeight="400"
              color={colors.textTertiary}
            >
              {description}
            </Text>
          )}
        </Box>
        <IconButton
          position="absolute"
          top={16}
          right={16}
          icon="Close"
          buttonStyle="round"
          onClick={() => console.log("123123")}
        />
      </Box>
    </AnimatedBox>
  );
}
