import { useTheme } from "styled-components";

import { Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import RsvpButton from "@/community/components/objects/RsvpButton";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  id: string;
  onRsvpSubmit: () => void;
}

export default function RsvpHeadingSection({
  stream,
  id,
  onRsvpSubmit,
}: IProps): JSX.Element {
  const { space, colors, zIndices } = useTheme();
  const startTime = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );
  return (
    <Box
      p={[space.xxxs, `${space.xxs}px ${space.xxs}px ${space.xs}px`]}
      bg={["", colors.primaryLight]}
    >
      <Grid
        gridTemplateColumns="4fr 1fr"
        alignItems="start"
        gridGap={space.xxs}
      >
        <Box>
          <Text textStyle="headline5">{stream.topic_detail.name}</Text>
          <Flex gridGap={4} alignItems="center">
            <Text textStyle="caption" color={colors.accentLight}>
              Streaming
            </Text>
            <Icon color={colors.textSecondary} icon="Calendar" size={16} />
            <Text color={colors.textSecondary} textStyle="caption">
              {startTime}
            </Text>
          </Flex>
        </Box>
        <Box
          position={["fixed", "static"]}
          bottom={[0, "auto"]}
          right={[0, "auto"]}
          left={[0, "auto"]}
          zIndex={[zIndices.overlay - 10, "auto"]}
        >
          <RsvpButton id={id} onRsvpSubmit={onRsvpSubmit} webinar={stream} />
        </Box>
      </Grid>
    </Box>
  );
}
