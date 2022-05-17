import { useTheme } from "styled-components";

import { Box, Image, Text } from "@/common/components/atoms";

export default function StreamCreationModalSuccess(): JSX.Element {
  const { space } = useTheme();

  return (
    <>
      <Text textStyle="headline5">What&apos;s next?</Text>

      <Box gridColumn="1">
        <Text textStyle="headline6" color="#D5BBFF" pb={space.xxs}>
          Your stream has been set up.
        </Text>

        <Text lineHeight="180%">
          Before you start streaming awesome content on Crater, we&apos;d like
          to help you prepare with a small walkthrough of what to expect.
        </Text>
      </Box>

      <Box gridColumn="2">
        <Box
          w={57}
          h={142}
          transform="rotate(180deg)"
          position="absolute"
          left={528}
        >
          <Image src="/images/img_journey_rocket.png" alt="crater-rocket" />
        </Box>
        <Box w={421} h={117} position="absolute" left={267} top={150}>
          <Image src="/images/img_rocket_smoke.png" alt="crater-rocket" />
        </Box>
        <Box w={382} h={102} position="absolute" left={308} top={166.5}>
          <Image
            src="/images/img_rocket_smoke_gradient.png"
            alt="crater-rocket"
          />
        </Box>
      </Box>
    </>
  );
}
