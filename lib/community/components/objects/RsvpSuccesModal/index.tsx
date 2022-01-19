import CRATER_LOGO from "public/images/crater_logo.png";
import { useCallback, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import {
  Grid,
  Text,
  Modal,
  Avatar,
  Box,
  Image,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import WebinarApiClient from "@/community/api";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import useStreamCreator from "@/stream/context/StreamCreatorContext";

import StreamCard from "../StreamCard";

interface IProps {
  group: Webinar;
  visble: boolean;
  onClose: () => void;
}

enum RsvpModalPage {
  DiscoverFollowers,
  UpcomingStreams,
  ExploreMore,
  __length,
}

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    max-height: 100%;
  }
`;

export default function RsvpSuccesModal({
  visble,
  group,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const hostName = group.host_detail?.name;
  const [subscribe, setSubscribe] = useState({});
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const {
    streams,
    loading: streamCreatorsLoading,
    setStreamCreatorsPage,
  } = useStreamCreator();
  const _observer = useRef<IntersectionObserver>();
  const [rsvpModalPage, setRsvpModalPage] = useState<number>(
    RsvpModalPage.DiscoverFollowers
  );
  const { liveStreams, loading: liveStreamsLoading } = useLiveStreams();
  const {
    upcoming: upcomingStreams,
    loading: upcomingStreamsLoading,
    mutateUpcomingStreams,
  } = useUpcomingStreams();
  const { track } = useAnalytics();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (streamCreatorsLoading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setStreamCreatorsPage((page) => page + 1);
        }
      });

      if (node != null) _observer.current.observe(node);
    },
    [_observer, streamCreatorsLoading, setStreamCreatorsPage]
  );

  const postGroupRequest = useCallback(
    async (webinar: Webinar): Promise<void> => {
      const data: PostGroupRequest = {
        group: webinar.id,
        participant_type: ParticpantType.attendee,
        status: RequestStatus.accepted,
      };

      const [request] = await WebinarApiClient().postWebinarRequest(data);

      if (request) {
        mutateUpcomingStreams();

        track(AnalyticsEvents.rsvp_stream, {
          stream: webinar.id,
          stream_name: webinar.topic_detail?.name,
          host: {
            ...webinar.host_detail,
          },
        });
      }
    },
    [track, mutateUpcomingStreams]
  );

  if (
    !followers ||
    followersLoading ||
    streamCreatorsLoading ||
    liveStreamsLoading ||
    !liveStreams ||
    upcomingStreamsLoading ||
    !upcomingStreams
  )
    return <Spinner />;

  const liveAndUpcomingStreams = [...liveStreams, ...upcomingStreams];

  const text = `
    We will notify you prior to the stream with ${hostName}.
    You can also follow other creators to get notified when they are live on Crater.
  `;

  const goToNextScreen = async (): Promise<void> => {
    if (rsvpModalPage === RsvpModalPage.ExploreMore) {
      onClose();
    } else {
      setRsvpModalPage((prevValue) => {
        if (RsvpModalPage.__length - prevValue - 1 > 0) {
          return prevValue + 1;
        }
      });
    }
  };

  const goToPreviousScreen = async (): Promise<void> => {
    setRsvpModalPage((prevValue) => {
      if (prevValue > 0) {
        return prevValue - 1;
      }
    });
  };

  const videoUrl =
    "https://1worknetwork-prod.s3.amazonaws.com/media/mp4_rsvp.mp4";

  return (
    <Modal
      display="grid"
      gridTemplateRows="max-content max-content 1fr max-content"
      maxWidth={600}
      visible={visble}
      onClose={onClose}
      overflowY="hidden"
      px={space.xs}
      py={space.xxs}
      gridGap={space.xxs}
    >
      <Box w={100} justifySelf="center" alignSelf="center">
        <Image src={CRATER_LOGO} alt="Crater Logo" objectFit="cover" />
      </Box>

      {(() => {
        if (rsvpModalPage === RsvpModalPage.DiscoverFollowers) {
          return (
            <>
              <Box>
                <Text textStyle="headline5">Don&apos;t miss out!</Text>
                <Text my={space.xxs} color={colors.white[1]}>
                  {text}
                </Text>

                <Text px={space.xxs} textStyle="headline6">
                  Discover creators
                </Text>
              </Box>

              <Box px={space.xxs} overflowY="scroll">
                {streams &&
                  streams?.map((stream, index) => (
                    <Grid
                      mb={space.xxs}
                      gridAutoFlow="column"
                      gridGap={space.xxs}
                      gridTemplateColumns="min-content 1fr min-content"
                      alignItems="center"
                      justifyItems="center"
                      key={stream.id}
                      ref={index == streams.length - 1 ? ref : null}
                    >
                      <Avatar
                        image={stream.host_detail?.photo}
                        size={56}
                        alt={stream.host_detail?.name || ""}
                      />
                      <Box justifySelf="start">
                        <Text textStyle="bodyLarge">
                          {stream.host_detail.name}
                        </Text>
                        <Text maxLines={2} color={colors.slate}>
                          {stream.is_live ? "Live Now: " : "Upcoming: "}
                          {stream.topic_detail.name}
                        </Text>
                      </Box>
                      {!subscribe.hasOwnProperty(stream.id) ? (
                        <Button
                          text="Follow"
                          variant="round-secondary"
                          border="1px solid white"
                          bg={colors.black[5]}
                          borderRadius={50}
                          justifySelf="end"
                          textProps={{ minWidth: 38, px: 0 }}
                          onClick={() => {
                            const creator =
                              stream.host_detail?.creator_detail?.id;
                            if (creator) {
                              subscribeCreator(creator);
                              setSubscribe((prevSubscriber) => ({
                                ...prevSubscriber,
                                [stream.id]: true,
                              }));
                            }
                          }}
                        />
                      ) : (
                        <Button
                          text="Followed"
                          variant="round-secondary"
                          color="black.2"
                          bg={colors.white[1]}
                          borderRadius={50}
                          justifySelf="end"
                          textProps={{ minWidth: 38, px: 0 }}
                          disabled={true}
                        />
                      )}
                    </Grid>
                  ))}
              </Box>
            </>
          );
        } else if (rsvpModalPage === RsvpModalPage.UpcomingStreams) {
          return (
            <>
              <Box>
                <Text textStyle="headline5">Upcoming Streams</Text>
              </Box>

              <Box px={space.xxs} overflowY="scroll">
                <Grid
                  gridTemplateColumns="repeat(2, 1fr)"
                  gridAutoRows="1fr"
                  gridColumnGap={space.xs}
                  gridRowGap={space.s}
                >
                  {liveAndUpcomingStreams.map((stream) => {
                    if (stream.id !== group.id) {
                      return (
                        <Grid
                          gridAutoFlow="row"
                          gridTemplateRows="1fr min-content"
                          gridGap={space.xxxs}
                        >
                          <StreamCard stream={stream} key={stream.id} />
                          {stream.is_live ? (
                            <Link
                              href={`/livestream/${stream.id}/`}
                              boxProps={{
                                target: "_blank",
                                justifySelf: "center",
                              }}
                            >
                              <Button
                                text="Join Stream"
                                variant="round-secondary"
                                border="1px solid white"
                                bg={colors.black[5]}
                                borderRadius={50}
                                textProps={{ minWidth: 38, px: 0 }}
                              />
                            </Link>
                          ) : stream.rsvp ? (
                            <Button
                              text="RSVP'd"
                              variant="round-secondary"
                              color="black.2"
                              bg={colors.white[1]}
                              borderRadius={50}
                              justifySelf="center"
                              textProps={{ minWidth: 38, px: 0 }}
                              disabled={true}
                            />
                          ) : (
                            <Button
                              text="RSVP"
                              variant="round-secondary"
                              border="1px solid white"
                              bg={colors.black[5]}
                              borderRadius={50}
                              justifySelf="center"
                              textProps={{ minWidth: 38, px: 0 }}
                              onClick={() => postGroupRequest(stream)}
                            />
                          )}
                        </Grid>
                      );
                    }
                  })}
                </Grid>
              </Box>
            </>
          );
        } else if (rsvpModalPage === RsvpModalPage.ExploreMore) {
          return (
            <>
              <Box>
                <Text textStyle="headline5">Explore more on Crater</Text>
              </Box>
              <Grid
                gridAutoFlow="row"
                gridTemplateRows="auto auto"
                gridGap={space.xxs}
              >
                <Box maxWidth="90%" justifySelf="center">
                  <Video autoPlay loop muted>
                    <source src={videoUrl} type="video/mp4" />
                  </Video>
                </Box>
                <Box>
                  <Grid gridGap={space.xxs} justifyItems="center">
                    <Button variant="outline-small" text="Be a Creator" />
                    <Button variant="outline-small" text="Explore Auctions" />
                    <Button
                      variant="outline-small"
                      text="Explore Past Streams"
                    />
                  </Grid>
                </Box>
              </Grid>
            </>
          );
        }
      })()}

      <Grid gridAutoFlow="column">
        {rsvpModalPage === RsvpModalPage.DiscoverFollowers ? undefined : (
          <Button
            text="Back"
            variant="round"
            justifySelf="start"
            alignSelf="center"
            borderRadius={50}
            onClick={goToPreviousScreen}
          />
        )}
        <Button
          text={rsvpModalPage === RsvpModalPage.ExploreMore ? "Done" : "Next"}
          variant="round"
          justifySelf="end"
          alignSelf="center"
          onClick={goToNextScreen}
        />
      </Grid>
    </Modal>
  );
}
