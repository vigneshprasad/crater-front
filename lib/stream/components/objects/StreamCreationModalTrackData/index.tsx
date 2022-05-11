import { useTheme } from "styled-components";

import { Box, Image, Text } from "@/common/components/atoms";

export default function StreamCreationModalTrackData(): JSX.Element {
  const { space } = useTheme();

  return (
    <>
      <Text textStyle="headline6" color="#D5BBFF" pb={space.xxs}>
        Track your data
      </Text>

      <Text gridColumn={1} lineHeight="180%">
        Before you start streaming awesome content on Crater, we&apos;d like to
        help you prepare with a small walkthrough of what to expect.
      </Text>

      <Box gridColumn={2} w={271} h={192} justifySelf="center">
        <Image src="/images/sample_rsvp_page.png" alt="rsvp-sample" />
      </Box>
    </>
  );
}
