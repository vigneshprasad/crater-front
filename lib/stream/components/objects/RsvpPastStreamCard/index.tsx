import { forwardRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Text, Box, Link, Flex, Avatar, Grid } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { PastStreamListItem } from "@/community/types/community";

interface IProps {
  stream: PastStreamListItem;
  link?: string;
}

const RsvpPastStreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link }, ref) => {
    const { space, radii, breakpoints } = useTheme();

    const { matches: isMobile } = useMediaQuery(
      `(max-width: ${breakpoints[0]})`
    );

    const image = (
      <Box
        w="100%"
        position="relative"
        pt="56.25%"
        borderRadius={radii.xxxxs}
        overflow="hidden"
      >
        <Image
          src={stream.topic_detail.image}
          layout="fill"
          alt={stream.topic_detail.name}
        />
      </Box>
    );

    const streamDetails = (
      <>
        <Flex
          pt={space.xxs}
          pb={space.xxxxs}
          gridGap={space.xxxxs}
          alignItems="center"
        >
          <Avatar size={28} image={stream.host_detail.photo} />
          <Text textStyle="body">{stream.host_detail.name}</Text>
        </Flex>
        <Text textStyle="title" minHeight={52}>
          {stream.topic_detail.name}
        </Text>
      </>
    );

    if (isMobile === undefined) return null;

    if (isMobile) {
      return (
        <Link
          href={link ?? PageRoutes.streamVideo(stream.id)}
          boxProps={{ target: "_blank" }}
        >
          <Grid
            pb={space.xxxs}
            gridGap={space.xxxxs}
            gridTemplateColumns="1fr 2fr"
            borderBottom="1px solid #333333"
          >
            <Box
              position="relative"
              pt="56.25%"
              borderRadius={radii.xxxxs}
              overflow="hidden"
            >
              <Image
                src={stream.topic_detail.image}
                layout="fill"
                alt={stream.topic_detail.name}
              />
            </Box>
            <Box>
              <Text maxLines={2}>{stream.topic_detail.name}</Text>
              <Flex alignItems="center" gridGap={space.xxxxs}>
                <Avatar size={16} image={stream.host_detail.photo} />
                <Text fontSize="1rem">{stream.host_detail.name}</Text>
              </Flex>
            </Box>
          </Grid>
        </Link>
      );
    }

    return (
      <Link
        href={link ?? PageRoutes.streamVideo(stream.id)}
        boxProps={{ target: "_blank" }}
      >
        <Box ref={ref}>
          {image}
          {streamDetails}
        </Box>
      </Link>
    );
  }
);

RsvpPastStreamCard.displayName = "RsvpPastStreamCard";

RsvpPastStreamCard.defaultProps = {
  link: undefined,
};

export default RsvpPastStreamCard;
