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
        You have a unique share link that can be found on the session page.
        Share your stream using this link and know where your viewers come from.
      </Text>

      <Box gridColumn={2} w={271} h={192} justifySelf="center">
        <Image src="/images/sample_rsvp_page.png" alt="rsvp-sample" />
      </Box>
    </>
  );
}
