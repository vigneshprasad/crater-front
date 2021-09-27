import { AnimateSharedLayout } from "framer-motion";
import { forwardRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { AnimatedBox, Box, Text, Grid } from "@/common/components/atoms";

type Props = {
  id: number;
  image?: string;
  name?: string;
  followers: number;
};

const CreatorCard = forwardRef<HTMLDivElement, Props>(
  ({ image, name, followers }, ref) => {
    const { space, colors } = useTheme();
    const thousandMultiple = Math.round(followers / 100) / 10;
    const formatted = `${thousandMultiple}K`;
    return (
      // <Link href={`/creator/${id}`}>
      <Grid ref={ref}>
        <AnimateSharedLayout>
          <AnimatedBox position="relative" layout h={[200, 220]}>
            <AnimatedBox
              top={0}
              right={0}
              left={0}
              bottom={0}
              position="absolute"
              bg={colors.accent}
            />
            <AnimatedBox overflow="hidden" whileHover={{ x: 8, y: -8 }} h={220}>
              {image && (
                <Image objectFit="cover" layout="fill" src={image} alt={name} />
              )}
            </AnimatedBox>
          </AnimatedBox>
        </AnimateSharedLayout>

        <Box py={space.xxs}>
          <Text textStyle="title">{name}</Text>
          <Text color={colors.slate} textStyle="body">
            {formatted} Followers
          </Text>
        </Box>
      </Grid>
      // </Link>
    );
  }
);

CreatorCard.displayName = "CreatorCard";

export default CreatorCard;
