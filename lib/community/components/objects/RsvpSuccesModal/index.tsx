import { Player } from "@lottiefiles/react-lottie-player";
import { DateTime } from "luxon";
import anim from "public/anims/rsvp-success-animation.json";
import { useTheme } from "styled-components";

import { Box, Grid, Modal, Text, Icon, Link } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
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
          <Grid
            mt={space.s}
            gridTemplateColumns="1fr 1fr"
            alignItems="start"
            gridGap={space.xxs}
          >
            <Link
              passHref
              href={`//www.linkedin.com/shareArticle?mini=true&url=${url}&title=${group.topic_detail?.name}`}
              boxProps={{ target: "_blank" }}
            >
              <Button
                variant="full-width"
                bg={colors.linkedin}
                prefixElement={
                  <Icon
                    size={20}
                    icon="Linkedin"
                    fill
                    color={colors.white[0]}
                  />
                }
                text="Share"
              />
            </Link>
            <Link
              passHref
              href={`//twitter.com/share?text=${group.topic_detail?.name}&url=${url}`}
              boxProps={{ target: "_blank" }}
            >
              <Button
                variant="full-width"
                bg={colors.twitter}
                prefixElement={
                  <Icon size={20} icon="Twitter" fill color={colors.white[0]} />
                }
                text="Tweet"
              />
            </Link>
          </Grid>
        </Box>
      </Grid>
    </Modal>
  );
}
