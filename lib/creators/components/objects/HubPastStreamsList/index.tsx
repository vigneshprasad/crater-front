import { useCallback, useState } from "react";
import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { PastStreamListItem } from "@/community/types/community";
import { Creator } from "@/creators/types/creator";
import ShareStreamModal from "@/stream/components/objects/ShareStreamModal";
import StreamCreationModal from "@/stream/components/objects/StreamCreationModal";
import useMyPastStreams from "@/stream/context/MyPastStreamsContext";

type IProps = {
  creator: Creator | null;
};

export default function HubPastStreamsList({ creator }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [initialClick, setInitialClick] = useState(true);
  const [streamToShare, setStreamToShare] = useState<PastStreamListItem>();
  const [showShareModal, setShowShareModal] = useState(false);
  const {
    past: streams,
    loading,
    nextPage,
    setMyPastStreamsPage,
  } = useMyPastStreams();
  const [createStreamModal, setCreateStreamModal] = useState(false);

  const handleShareClick = useCallback(
    (stream: PastStreamListItem) => {
      setStreamToShare(stream);
      setShowShareModal(true);
    },
    [setStreamToShare]
  );

  return (
    <>
      <StreamCreationModal
        visible={createStreamModal}
        onClose={() => setCreateStreamModal(false)}
      />
      <ShareStreamModal
        stream={streamToShare}
        visible={showShareModal}
        url={streamToShare && PageRoutes.streamVideo(streamToShare?.id)}
        onClose={() => setShowShareModal(false)}
      />
      {(() => {
        if (!streams || loading) {
          return Array(4)
            .fill("")
            .map((_, index) => (
              <Shimmer
                w="100%"
                h={120}
                mb={space.xs}
                pb={space.xs}
                key={index}
              />
            ));
        }

        if (streams?.length === 0) {
          return (
            <Grid
              flexDirection="row"
              gridTemplateColumns="max-content 1fr"
              gridGap={space.s}
            >
              <Box position="relative" w={190} h={190}>
                <Image
                  src="/images/img_referral_alt.png"
                  alt="No Streams"
                  layout="fill"
                />
              </Box>
              <Flex
                flexDirection="column"
                gridGap={space.xxxs}
                justifyContent="center"
              >
                <Box>
                  <Text textStyle="formLabel" fontWeight={500}>
                    You have no past streams here.
                  </Text>
                  <Text
                    pt={space.xxxs}
                    pb={space.xs}
                    textStyle="body"
                    color={colors.textTertiary}
                  >
                    Setting up a stream takes less than 2 minutes. We recommend
                    setting up a stream 24 hours before you plan to go live.
                  </Text>
                </Box>
                {creator ? (
                  <Button
                    label="Create New Stream"
                    w={200}
                    minHeight={40}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    prefixElement={<Icon icon="CameraLive" size={18} />}
                    onClick={() => setCreateStreamModal(true)}
                  />
                ) : (
                  <a
                    href="https://calendly.com/craterclub/go_live_on_crater?utm_source=website&utm_medium=navbar"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      label="Talk to us"
                      w={150}
                      minHeight={40}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      prefixElement={<Icon icon="Phone" size={16} />}
                    />
                  </a>
                )}
              </Flex>
            </Grid>
          );
        }

        return streams.map((stream) => {
          const startTime = DateTime.parse(stream.start).toFormat(
            DateTime.DEFAULT_FORMAT
          );

          return (
            <Grid
              pb={space.xs}
              mb={space.xs}
              gridAutoFlow="column"
              gridTemplateColumns="max-content 1fr max-content"
              alignItems="center"
              gridGap={space.xxs}
              borderBottom={`1px solid ${colors.secondaryLight}`}
              key={stream.id}
            >
              <Link href={PageRoutes.streamVideo(stream.id)}>
                <Box
                  w={226}
                  h={120}
                  borderRadius={radii.xxxxs}
                  overflow="hidden"
                >
                  {stream.topic_detail?.image && (
                    <Image
                      objectFit="cover"
                      layout="fill"
                      src={stream.topic_detail?.image}
                      alt={stream.topic_detail.name}
                    />
                  )}
                </Box>
              </Link>
              <Box>
                <Text>{stream.topic_detail.name}</Text>
                <Flex
                  pt={space.xxxxs}
                  color={colors.textSecondary}
                  alignItems="center"
                  gridGap={space.xxxxs}
                >
                  <Text
                    textStyle="small"
                    fontWeight={600}
                    color={colors.textTertiary}
                  >
                    Streamed on:
                  </Text>
                  <Icon size={16} color="inherit" icon="Calendar" />
                  <Text textStyle="small" fontWeight={500} color="inherit">
                    {startTime}
                  </Text>
                </Flex>
              </Box>
              <Button
                variant="text"
                label="SHARE"
                suffixElement={<Icon icon="ShareAlt" size={16} />}
                textProps={{
                  color: colors.textPrimary,
                }}
                onClick={() => handleShareClick(stream)}
              />
            </Grid>
          );
        });
      })()}

      {nextPage && (
        <Flex gridGap={space.xxs} alignItems="center">
          <Flex flex="1" h={1} bg={colors.secondaryLight} />
          <Button
            suffixElement={<Icon icon="ChevronDown" size={20} />}
            variant="condensed-dark"
            label="Show More"
            onClick={() => {
              if (initialClick) {
                setMyPastStreamsPage((page) => page + 1);
                setInitialClick(false);
                return;
              }

              setMyPastStreamsPage((page) => page + 2);
            }}
          />
          <Flex flex="1" h={1} bg={colors.secondaryLight} />
        </Flex>
      )}
    </>
  );
}
