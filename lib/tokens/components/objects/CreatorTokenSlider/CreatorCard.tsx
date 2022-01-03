import { Variants } from "framer-motion";
import { useTheme } from "styled-components";

import Image from "next/image";

import { AnimatedBox, Box, AnimatedBoxProps } from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

export interface CreatorCardProps extends AnimatedBoxProps {
  creator: Creator;
}

const cardVariants: Variants = {
  selected: {
    opacity: 1,
    transform: "scale(1, 1)",
  },
  enter: {
    opacity: 0.4,
    transform: "scale(0.9, 0.9)",
  },
};

const selectorVariants: Variants = {
  selected: {
    opacity: 1,
    background: "#9146FF",
  },
  enter: {
    opacity: 0,
    background: "transparent",
  },
};

export function CreatorCard({
  creator,
  ...rest
}: CreatorCardProps): JSX.Element {
  const { radii } = useTheme();

  return (
    <AnimatedBox
      transition={{ type: "linear" }}
      cursor="pointer"
      whileHover="selected"
      position="relative"
      variants={cardVariants}
      h={220}
      {...rest}
    >
      <AnimatedBox
        position="absolute"
        top={8}
        right={-8}
        left={0}
        bottom={8}
        variants={selectorVariants}
        borderRadius={radii.xxs}
      />
      <Box
        position="relative"
        w="100%"
        h="100%"
        overflow="hidden"
        borderRadius={radii.xxs}
      >
        {creator.profile_detail.photo && (
          <Image
            layout="fill"
            src={creator.profile_detail.photo}
            alt={creator.profile_detail.name}
            objectFit="cover"
          />
        )}
      </Box>
    </AnimatedBox>
  );
}
