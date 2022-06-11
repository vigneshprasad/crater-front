import { useTheme } from "styled-components";

import { Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
}

export default function RsvpHeadingSection({ stream }: IProps): JSX.Element {
  const { space, colors } = useTheme();
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
        <Button label="Join Stream" display={["none", "grid"]} />
      </Grid>
    </Box>
  );
}
