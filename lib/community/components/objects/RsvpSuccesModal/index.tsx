import { Player } from "@lottiefiles/react-lottie-player";
import { DateTime } from "luxon";
import anim from "public/anims/rsvp-success-animation.json";
import { useTheme } from "styled-components";

import { Box, Grid, Modal, Text } from "@/common/components/atoms";
import { Webinar } from "@/creators/types/community";

import UrlShare from "../UrlShare";

interface IProps {
  url: string;
  group: Webinar;
  visble?: boolean;
  onClose: () => void;
}

export default function RsvpSuccesModal({
  url,
  visble,
  group,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const hostName = group.host_detail?.name;
  const topic = group.topic_detail?.name;
  const date = DateTime.fromISO(group.start).toLocaleString(
    DateTime.DATETIME_FULL
  );
  const text = `
    You have successfully RSVP'd for conversations with ${hostName} // ${topic} on ${date}
  `;
  return (
    <Modal
      maxWidth={840}
      visible={visble}
      px={space.s}
      py={space.m}
      onClose={onClose}
    >
      <Grid gridTemplateColumns="1fr 1fr" gridGap={space.s}>
        <Player autoplay loop src={anim} />
        <Box>
          <Text textStyle="headline4">Congrats, you&apos;ve got a seat!</Text>
          <Text my={space.s} color={colors.white[1]}>
            {text}
          </Text>
          <UrlShare url={url} />
        </Box>
      </Grid>
    </Modal>
  );
}
