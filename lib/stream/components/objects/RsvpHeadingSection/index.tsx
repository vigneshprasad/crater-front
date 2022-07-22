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
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  ctaButton: {
    buttonText: string;
    loading?: boolean;
    disabled?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
  } | null;
}

export default function RsvpHeadingSection({
  stream,
  ctaButton,
}: IProps): JSX.Element {
  const { space, colors, zIndices, breakpoints } = useTheme();
  const startTime = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { buttonText, loading, disabled, icon, onClick } = ctaButton || {};

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
          isMobile ? (
            <Button
              variant="flat-with-disabled-dark"
              label={buttonText}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position={["fixed", "static"]}
              bottom={[0, "auto"]}
              right={[0, "auto"]}
              w={["100%", "auto"]}
              minHeight={44}
              h={[44, "auto"]}
              zIndex={[zIndices.overlay - 10, "auto"]}
              suffixElement={icon}
              disabled={true}
              textProps={{
                textStyle: "label",
              }}
            />
          ) : (
            <Button
              variant="flat-with-disabled-dark"
              label={buttonText}
              minHeight={44}
              display="flex"
              justifyContent="center"
              alignItems="center"
              suffixElement={icon}
              disabled={true}
              textProps={{
                textStyle: "label",
              }}
            />
          )
        ) : (
          <Button
            variant="flat-with-disabled-dark"
            label={buttonText}
            display="flex"
            justifyContent="center"
            alignItems="center"
            position={["fixed", "static"]}
            bottom={[0, "auto"]}
            right={[0, "auto"]}
            w={["100%", "auto"]}
            minHeight={44}
            h={[44, "auto"]}
            zIndex={[zIndices.overlay - 10, "auto"]}
            onClick={onClick}
            suffixElement={
              loading ? (
                <Spinner size={24} strokeColor={colors.white[0]} />
              ) : (
                icon
              )
            }
            disabled={loading}
            textProps={{
              textStyle: "label",
            }}
          />
        )}
      </Grid>
    </Box>
  );
}
