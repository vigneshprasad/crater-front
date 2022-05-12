import { forwardRef } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Avatar,
  Box,
  Grid,
  Link,
  Text,
  Flex,
  Icon,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import colors from "@/common/theme/colors";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  link?: string;
  hostSlug?: string;
}

const ImageContainer = styled(Box)``;

const Overlay = styled(Grid)``;

const Container = styled(Grid)`
  &:hover > ${ImageContainer} > ${Overlay} {
    display: grid;
    opacity: 1;
    background: rgba(145, 70, 255, 0.4);
  }

  .overlay {
    transition: all 0.2s ease-in;
  }
`;

const StreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link, hostSlug }, ref) => {
    const { space, radii } = useTheme();
    const startTime = DateTime.parse(stream.start).toFormat(
      DateTime.DEFAULT_FORMAT
    );
    return (
      <Link key={stream.id} href={link ?? `/session/${stream.id}`}>
        <Container gridGap={space.xxs} ref={ref}>
          <ImageContainer
            className="image-container"
            h={180}
            position="relative"
            pt="56.25%"
            borderRadius={radii.xxs}
            overflow="hidden"
          >
            {stream.topic_detail?.image && (
              <Image
                objectFit="cover"
                layout="fill"
                src={stream.topic_detail?.image}
                alt={stream.topic_detail.name}
              />
            )}
            {stream.is_live && (
              <Box
                borderRadius={4}
                py={2}
                px={space.xxxs}
                bg={stream.is_live ? colors.red[0] : colors.black[0]}
                position="absolute"
                top={space.xxxs}
                left={space.xxxs}
              >
                <Text textStyle="caption">LIVE</Text>
              </Box>
            )}
            <Overlay
              display="none"
              opacity={0}
              position="absolute"
              top={0}
              right={0}
              left={0}
              bottom={0}
              bg="transparent"
            >
              <Button m="auto auto" label="RSVP" />
            </Overlay>
          </ImageContainer>
          <Flex alignItems="center" gridGap={space.xxxs}>
            {hostSlug && (
              <Link href={PageRoutes.creatorProfile(hostSlug)}>
                <Avatar
                  size={28}
                  alt={stream.host_detail?.name || ""}
                  image={stream.host_detail?.photo}
                />
              </Link>
            )}

            <Text textStyle="body">{stream.host_detail?.name}</Text>
          </Flex>
          <Text maxLines={3}>{stream.topic_detail?.name}</Text>

          <Flex
            color={colors.textSecondary}
            alignItems="center"
            gridGap={space.xxxs}
          >
            <Icon size={16} color="inherit" icon="Calendar" />
            <Text textStyle="body" color="inherit">
              {startTime}
            </Text>
          </Flex>
        </Container>
      </Link>
    );
  }
);

StreamCard.displayName = "StreamCard";

StreamCard.defaultProps = {
  link: undefined,
  hostSlug: undefined,
};

export default StreamCard;
