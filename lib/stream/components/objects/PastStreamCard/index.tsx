import { forwardRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Grid, Link, Text, Flex, Avatar } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";

interface IProps {
  href: string;
  title: string;
  image: string;
  hostImage?: string;
  time: string;
  hostName?: string;
  hostSlug?: string;
}

const PastStreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ image, title, href, hostImage, hostName, time, hostSlug }, ref) => {
    const { radii, space, colors } = useTheme();
    const start = DateTime.parse(time);
    return (
      <Link href={href}>
        <Grid gridGap={space.xs} ref={ref}>
          <Box
            h={180}
            position="relative"
            pt="56.25%"
            overflow="hidden"
            borderRadius={radii.xxs}
          >
            {image && <Image src={image} alt={title} layout="fill" />}
          </Box>

          <Grid
            gridTemplateColumns="max-content 1fr"
            alignItems="center"
            gridGap={space.xxs}
          >
            <Link href={PageRoutes.creatorProfile(hostSlug ?? "")}>
              <Avatar size={56} image={hostImage} alt={title} />
            </Link>
            <Flex flexDirection="column">
              <Text textStyle="bodyLarge">{title}</Text>
              <Text textStyle="caption" color={colors.slate}>
                {hostName}, {start.toRelative()}
              </Text>
            </Flex>
          </Grid>
        </Grid>
      </Link>
    );
  }
);

PastStreamCard.displayName = "PastStreamCard";

PastStreamCard.defaultProps = {
  hostImage: undefined,
  hostName: undefined,
  hostSlug: undefined,
};

export default PastStreamCard;
