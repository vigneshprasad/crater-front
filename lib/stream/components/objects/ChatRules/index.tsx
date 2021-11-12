import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Text, Grid } from "@/common/components/atoms";

import BulletPoint from "./BulletPoint";

export default function ChatRules(): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const { space, colors } = useTheme();
  return (
    <Box
      px={space.xxs}
      py={space.xxxs}
      bg={colors.black[0]}
      cursor="pointer"
      onClick={() => setExpanded((state) => !state)}
    >
      <Grid
        gridTemplateColumns="1fr max-content"
        alignItems="center"
        pb={space.xxxs}
      >
        <Text textStyle="label">Important Chat Rules:</Text>
        {!expanded && (
          <Text mt={space.xxxs} textStyle="button">
            View More
          </Text>
        )}
      </Grid>

      <BulletPoint content="Please never share or ask for private contact details (eg.phone number &amp; emails) or Bank Details via this chat" />

      {expanded && (
        <>
          <BulletPoint content="Please use this forum only to send questions" />
          <BulletPoint content="Do not send any third party links on this chat, use the Linktree option to connect offline." />
          <BulletPoint content="Abuses &amp; inappropriate comments will not be tolerated" />
          <BulletPoint
            content={`Messages like "hi, hello"  etc should be avoided to prevent crowding of the forum.`}
          />
          <BulletPoint content="Any inappropriate comments, requests or content can be reported to vivan@crater.club" />
          <BulletPoint content="Any violation of the guidelines  will lead to immediate &amp; permanent removal from the community" />
        </>
      )}
    </Box>
  );
}
