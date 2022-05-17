import { useTheme } from "styled-components";

import { Box, Image, Text } from "@/common/components/atoms";

export default function StreamCreationModalAnalytics(): JSX.Element {
  const { space } = useTheme();

  return (
    <>
      <Text textStyle="headline6" color="#D5BBFF" pb={space.xxs}>
        After your stream
      </Text>

      <Text gridColumn={1} lineHeight="180%">
        You will get access to detailed analytics in your dashboard and access
        to all the raw data related to your stream.
      </Text>

      <Box gridColumn={2} w={271} h={192} justifySelf="center">
        <Image src="/images/sample_analytics_page.png" alt="rsvp-sample" />
      </Box>
    </>
  );
}
