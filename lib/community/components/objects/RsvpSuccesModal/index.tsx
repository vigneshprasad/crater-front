import styled, { useTheme } from "styled-components";

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

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function RsvpSuccesModal({
  url,
  visble,
  group,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const hostName = group.host_detail?.name;

  const videoUrl =
    "https://1worknetwork-prod.s3.amazonaws.com/media/mp4_rsvp.mp4";

  const text = `
    While you wait you
    can network with other like minds that are going to be tuning in
    using the mobile app.
  `;
  return (
    <Modal
      maxWidth={["calc(100% - 32px)", 720]}
      visible={visble}
      px={0}
      py={0}
      onClose={onClose}
      overflowY="auto"
    >
      <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={space.s}>
        <Video autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
        </Video>

        <Box px={[space.xxs, space.xs]} py={[space.xxs, space.s]}>
          <Text textStyle="headline5">
            {hostName} is getting ready to stream live to you!
          </Text>

          <Text my={space.xs} color={colors.white[1]}>
            {text}
          </Text>

          <Text textStyle="caption" mb={space.xxs}>
            Make Some Noise?
          </Text>

          <UrlShare url={url} />

          <Grid
            mt={space.xs}
            gridTemplateColumns="1fr 1fr"
            alignItems="start"
            gridGap={space.xs}
          >
            <Link
              passHref
              href={`//www.linkedin.com/shareArticle?mini=true&url=${url}&title=${group.topic_detail?.name}`}
              boxProps={{ target: "_blank" }}
            >
              <Button
                variant="full-width"
                bg={colors.black[5]}
                border="1px solid rgba(255, 255, 255, 0.1)"
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
                border="1px solid rgba(255, 255, 255, 0.1)"
                bg={colors.black[5]}
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
