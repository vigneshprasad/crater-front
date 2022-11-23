import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  Box,
  Text,
  Grid,
  Avatar,
  Flex,
  Icon,
  Span,
} from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  onClick?: (stream: Webinar) => Promise<void>;
}

export default function MobileCard({ stream, onClick }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const date = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );
  return (
    <Grid
      gridTemplateColumns="114px 1fr"
      gridGap={space.xxxs}
      onClick={() => {
        onClick && onClick(stream);
      }}
    >
      <Box pt="56.25%" position="relative">
        <Image
          src={stream.topic_detail.image ?? STATIC_IMAGES.ImageStreamDefault}
          layout="fill"
          alt={stream.topic_detail.name}
          objectFit="cover"
        />
      </Box>

      <Box>
        <Text maxLines={2}>{stream.topic_detail.name}</Text>
        <Flex gridGap={space.xxxs}>
          <Avatar size={16} image={stream.host_detail.photo} />
          <Text>{stream.host_detail.name}</Text>
        </Flex>
      </Box>

      <Flex
        gridColumn="1 / span 2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex alignItems="center" gridGap={space.xxxxs}>
          <Icon icon="Calendar" size={16} />
          <Text textStyle="body" color={colors.textSecondary}>
            {date}
          </Text>
        </Flex>

        <Text color={colors.accentLight}>
          {stream.has_rsvp && (
            <Span>
              <Icon icon="CheckCircle" color={colors.greenSuccess} />
            </Span>
          )}
          RSVP
        </Text>
      </Flex>
    </Grid>
  );
}
