import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Box, Image, Shimmer, Text } from "@/common/components/atoms";
import { ConversionFunnel, Creator } from "@/creators/types/creator";

interface IProps {
  creator: Creator | null;
  conversionFunnelData?: ConversionFunnel;
}

export default function ConversionFunnelBox({
  creator,
  conversionFunnelData,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const funnelLabels = useMemo<JSX.Element | null>(() => {
    if (conversionFunnelData) {
      const labelColor =
        conversionFunnelData.total_rsvp === 0
          ? colors.secondaryLight
          : colors.textQuartenary;

      return (
        <>
          <Box
            position="absolute"
            w={70}
            borderTop={`1px solid ${labelColor}`}
            right={200}
            top={86}
          />
          <Box position="absolute" right={140} top={75}>
            <Text fontWeight={600} color={labelColor}>
              RSVP
            </Text>
            {conversionFunnelData.total_rsvp !== 0 && (
              <Text fontWeight={600}>{conversionFunnelData.total_rsvp}</Text>
            )}
          </Box>
          <Box
            position="absolute"
            w={114}
            borderTop={`1px solid ${labelColor}`}
            right={200}
            top={160}
          />
          <Box position="absolute" right={110} top={150}>
            <Text fontWeight={600} color={labelColor}>
              Followers
            </Text>
            {conversionFunnelData.followers_percentage && (
              <Text fontWeight={600}>
                {conversionFunnelData.followers_percentage}%
              </Text>
            )}
          </Box>
          <Box
            position="absolute"
            w={150}
            borderTop={`1px solid ${labelColor}`}
            right={200}
            top={230}
          />
          <Box position="absolute" right={60} top={218}>
            <Text fontWeight={600} color={labelColor}>
              Recurring Users
            </Text>
            {conversionFunnelData.recurring_users_percentage && (
              <Text fontWeight={600}>
                {conversionFunnelData.recurring_users_percentage}%
              </Text>
            )}
          </Box>
        </>
      );
    }

    return null;
  }, [conversionFunnelData, colors]);

  return (
    <Box bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Text
        p={`${space.xs}px 24px ${space.xs}px ${space.xxs}px`}
        textStyle="label"
        color={colors.accentLight}
        bg={colors.primaryLight}
        textTransform="uppercase"
        borderRadius={`${radii.xxxxs}px ${radii.xxxxs}px 0px 0px`}
      >
        Conversion Funnel
      </Text>

      {(() => {
        if (!conversionFunnelData) {
          return <Shimmer w="100%" h={300} />;
        }

        if (!creator || conversionFunnelData.total_rsvp === 0) {
          return (
            <Box h={300} position="relative">
              <Text
                position="absolute"
                textStyle="body"
                fontWeight={600}
                top="38%"
                right="38%"
              >
                No data to show yet
              </Text>
              <Box w={267} h={267} left={16} bottom={42} position="absolute">
                <Image
                  src="/images/img_conversion_funnel_empty.png"
                  alt="conversion-funnel"
                />
              </Box>
              {funnelLabels}
            </Box>
          );
        }

        return (
          <Box h={300} position="relative">
            <Box w={267} h={267} left={16} bottom={42} position="absolute">
              <Image
                src="/images/img_conversion_funnel.png"
                alt="conversion-funnel"
              />
            </Box>
            {funnelLabels}
          </Box>
        );
      })()}
    </Box>
  );
}
