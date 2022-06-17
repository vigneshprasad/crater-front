import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Spinner,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  ctaButton: {
    buttonText: string;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  } | null;
}

export default function RsvpHeadingSection({
  stream,
  ctaButton,
}: IProps): JSX.Element {
  const { space, colors, zIndices } = useTheme();
  const startTime = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );

  const { buttonText, loading, disabled, onClick } = ctaButton || {};

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

        {disabled ? (
          <Button
            label={buttonText}
            position={["fixed", "static"]}
            bottom={[0, "auto"]}
            right={[0, "auto"]}
            w={["100%", "auto"]}
            minHeight={44}
            h={[44, "auto"]}
            zIndex={[zIndices.overlay - 10, "auto"]}
            disabled={true}
          />
        ) : (
          <Button
            label={buttonText}
            position={["fixed", "static"]}
            bottom={[0, "auto"]}
            right={[0, "auto"]}
            w={["100%", "auto"]}
            minHeight={44}
            h={[44, "auto"]}
            zIndex={[zIndices.overlay - 10, "auto"]}
            onClick={onClick}
            suffixElement={
              loading && <Spinner size={24} strokeColor={colors.white[0]} />
            }
            disabled={loading}
          />
        )}
      </Grid>
    </Box>
  );
}
