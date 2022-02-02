import { forwardRef } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Grid, Link, Text } from "@/common/components/atoms";
import colors from "@/common/theme/colors";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  link?: string;
}

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const StreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link }, ref) => {
    const { space, radii } = useTheme();
    const startTime = DateTime.parse(stream.start);
    return (
      <Link key={stream.id} href={link ?? `/session/${stream.id}`}>
        <Grid gridGap={space.xs} ref={ref}>
          <Box
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
            <Box
              borderRadius={4}
              py={2}
              px={space.xxxs}
              bg={stream.is_live ? colors.red[0] : colors.black[0]}
              position="absolute"
              top={space.xxxs}
              left={space.xxxs}
            >
              <Text textStyle="caption">
                {stream.is_live ? (
                  "LIVE"
                ) : (
                  <>
                    <Span>Live On</Span>{" "}
                    {startTime.toFormat(DateTime.DEFAULT_FORMAT)}
                  </>
                )}
              </Text>
            </Box>
          </Box>
          <Grid
            gridTemplateColumns="min-content 1fr"
            gridGap={space.xxs}
            alignItems="center"
          >
            <Avatar
              size={56}
              alt={stream.host_detail?.name || ""}
              image={stream.host_detail?.photo}
            />
            <Box>
              <Text maxLines={3}>{stream.topic_detail?.name}</Text>
              <Text color={colors.slate} textStyle="caption">
                {stream.host_detail?.name}
              </Text>
            </Box>
          </Grid>
        </Grid>
      </Link>
    );
  }
);

StreamCard.displayName = "StreamCard";

export default StreamCard;
