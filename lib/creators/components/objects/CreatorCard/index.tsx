import { AnimateSharedLayout } from "framer-motion";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { AnimatedBox, Box, Text, Link, Grid } from "@/common/components/atoms";

type Props = PropsWithChildren<{
  id: number;
  image?: string;
  name?: string;
  followers: number;
}>;

export default function CreatorCard({
  id,
  image,
  name,
  followers,
}: Props): JSX.Element {
  const { space, colors } = useTheme();
  const thousandMultiple = Math.round(followers / 100) / 10;
  const formatted = `${thousandMultiple}K`;
  return (
    <Link href={`/creator/${id}`}>
      <Grid>
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
    </Link>
  );
}

CreatorCard.Loader = function Loader(): JSX.Element {
  return (
    <AnimatedBox
      h={[200, 220]}
      animate={{ background: ["#353535", "#a8a8a8"] }}
      transition={{ flip: Infinity, duration: 1 }}
    />
  );
};
