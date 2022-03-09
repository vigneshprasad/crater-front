import CRATER_LOGO from "public/images/crater_logo.png";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Grid,
  Text,
  Modal,
  Avatar,
  Box,
  Image,
  Span,
  Shimmer,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import IconButton from "@/common/components/atoms/IconButton";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import DateTime from "@/common/utils/datetime/DateTime";
import WebinarApiClient from "@/community/api";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import useStreamCreator from "@/stream/context/StreamCreatorContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

interface IProps {
  group: Webinar;
  visble: boolean;
  onClose: () => void;
}

enum RsvpModalPage {
  DiscoverFollowers,
  LiveAndUpcomingStreams,
  // ExploreMore,
  __length,
}

// const Video = styled.video`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;

//   @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
//     max-height: 100%;
//   }
// `;

export default function RsvpSuccesModal({
  visble,
  group,
  onClose,
}: IProps): JSX.Element | null {
  const { space, colors } = useTheme();
  const hostName = group.host_detail?.name;
  const [subscribe, setSubscribe] = useState({});
  const { subscribeCreator } = useFollower();
  const {
    streams: streamCreators,
    loading: streamCreatorsLoading,
    setStreamCreatorsPage,
  } = useStreamCreator();
  const _observer = useRef<IntersectionObserver>();
  const [rsvpModalPage, setRsvpModalPage] = useState<number>(
    RsvpModalPage.DiscoverFollowers
  );
  const {
    liveStreams,
    loading: liveStreamsLoading,
    setFeaturedStreamPage,
  } = useLiveStreams();
  const {
    upcoming: upcomingStreams,
    loading: upcomingStreamsLoading,
    setUpcomingStreamsPage,
    mutateUpcomingStreams,
  } = useUpcomingStreams();
  const { track } = useAnalytics();
  const router = useRouter();
  const { user } = useAuth();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (rsvpModalPage === RsvpModalPage.DiscoverFollowers) {
        if (streamCreatorsLoading) return;
        if (_observer.current) _observer.current.disconnect();
        _observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setStreamCreatorsPage((page) => page + 1);
          }
        });
      } else if (rsvpModalPage === RsvpModalPage.LiveAndUpcomingStreams) {
        if (liveStreamsLoading && upcomingStreamsLoading) return;
        if (_observer.current) _observer.current.disconnect();
        _observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setFeaturedStreamPage((page) => page + 1);
            setUpcomingStreamsPage((page) => page + 1);
          }
        });
      }

      if (node != null && _observer.current) _observer.current.observe(node);
    },
    [
      rsvpModalPage,
      streamCreatorsLoading,
      setStreamCreatorsPage,
      liveStreamsLoading,
      upcomingStreamsLoading,
      setFeaturedStreamPage,
      setUpcomingStreamsPage,
    ]
  );

  const postGroupRequest = useCallback(
    async (webinar: Webinar, redirect = false): Promise<void> => {
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

      if (redirect) {
        track(AnalyticsEvents.join_stream, {
          stream: webinar.id,
          stream_name: webinar.topic_detail?.name,
          host: {
            ...webinar.host_detail,
          },
        });
        router.push(PageRoutes.stream(webinar.id.toString()));
      }
    },
    [track, mutateUpcomingStreams, router]
  );

  const goToNextScreen = useCallback(async (): Promise<void> => {
    if (rsvpModalPage === RsvpModalPage.__length - 1) {
      onClose();
    } else {
      if (RsvpModalPage.__length - rsvpModalPage - 1 > 0) {
        setRsvpModalPage((prevValue) => prevValue + 1);
      }
    }
  }, [onClose, rsvpModalPage]);

  const goToPreviousScreen = useCallback(async (): Promise<void> => {
    if (rsvpModalPage > 0) {
      setRsvpModalPage((prevValue) => prevValue - 1);
    }
  }, [rsvpModalPage]);

  const liveAndUpcomingStreams = useCallback((): Webinar[] => {
    if (
      liveStreamsLoading ||
      upcomingStreamsLoading ||
      !liveStreams ||
      !upcomingStreams
    )
      return [] as Webinar[];

    return [...liveStreams, ...upcomingStreams].filter(
      (stream, index, self) =>
        index === self.findIndex((x) => x.id === stream.id)
    );
  }, [
    liveStreams,
    liveStreamsLoading,
    upcomingStreams,
    upcomingStreamsLoading,
  ]);

  if (!user) return null;

  const text = `
    We will notify you prior to the stream with ${hostName}.
    You can also follow other creators to get notified when they are live on Crater.
  `;

  // const videoUrl =
  //   "https://1worknetwork-prod.s3.amazonaws.com/media/mp4_rsvp.mp4";

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
      {rsvpModalPage !== RsvpModalPage.DiscoverFollowers && (
        <IconButton
          zIndex={20}
          variant="roundSmall"
          left={16}
          top={16}
          position="absolute"
          icon="ChevronLeft"
          onClick={goToPreviousScreen}
          iconProps={{ padding: "2px" }}
        />
      )}

      <Box w={100} justifySelf="center" alignSelf="center">
        <Image src={CRATER_LOGO} alt="Crater Logo" objectFit="cover" />
      </Box>

      {(() => {
        if (rsvpModalPage === RsvpModalPage.DiscoverFollowers) {
          return (
            <>
              <Box pt={space.xxs}>
                <Text textStyle="headline5">Don&apos;t miss out!</Text>
                <Text my={space.xxs} color={colors.white[1]}>
                  {text}
                </Text>

                <Text textStyle="headline6">Discover creators</Text>
              </Box>

              <Box overflowY="scroll">
                {streamCreatorsLoading && <Shimmer w="100%" h="100%" />}
                {streamCreators &&
                  streamCreators?.map((streamCreator, index) => (
                    <Grid
                      mb={space.xxs}
                      gridGap={space.xxs}
                      gridTemplateColumns="max-content 1fr max-content"
                      alignItems="center"
                      key={streamCreator.id}
                      ref={index == streamCreators.length - 1 ? ref : null}
                    >
                      <Avatar
                        image={streamCreator.host_detail?.photo}
                        size={56}
                        alt={streamCreator.host_detail?.name || ""}
                      />
                      <Box justifySelf="start">
                        <Text textStyle="bodyLarge">
                          {streamCreator.host_detail.name}
                        </Text>
                        <Text display={["none", "grid"]} color={colors.slate}>
                          {streamCreator.is_live ? "Live Now: " : "Upcoming: "}
                          {streamCreator.topic_detail.name}
                        </Text>
                      </Box>
                      {!subscribe.hasOwnProperty(streamCreator.id) ? (
                        <Button
                          text="Follow"
                          variant="round-secondary"
                          border="1px solid white"
                          bg={colors.black[5]}
                          borderRadius={50}
                          justifySelf="end"
                          // textProps={{ minWidth: 38, px: 0 }}
                          onClick={() => {
                            const creator =
                              streamCreator.host_detail?.creator_detail?.id;
                            if (creator) {
                              subscribeCreator(creator);
                              setSubscribe((prevSubscriber) => ({
                                ...prevSubscriber,
                                [streamCreator.id]: true,
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
                          // textProps={{ minWidth: 38, px: 0 }}
                          disabled={true}
                        />
                      )}
                      <Text
                        display={["grid", "none"]}
                        gridColumn="1 / span 3"
                        color={colors.slate}
                      >
                        {streamCreator.is_live ? "Live Now: " : "Upcoming: "}
                        {streamCreator.topic_detail.name}
                      </Text>
                    </Grid>
                  ))}
              </Box>
            </>
          );
        } else if (rsvpModalPage === RsvpModalPage.LiveAndUpcomingStreams) {
          return (
            <>
              <Box pt={space.xxs}>
                <Text textStyle="headline5">Live & Upcoming Streams</Text>
              </Box>

              <Box overflowY="scroll">
                <Grid
                  gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
                  gridColumnGap={space.xs}
                  gridRowGap={space.xs}
                >
                  {liveStreamsLoading && upcomingStreamsLoading ? (
                    <Shimmer w="100%" h="100%" />
                  ) : (
                    liveAndUpcomingStreams &&
                    liveAndUpcomingStreams().map((stream, index) => {
                      if (
                        stream.id !== group.id &&
                        stream.host_detail.pk !== user.pk
                      ) {
                        return (
                          <Grid
                            gridAutoFlow="row"
                            gridGap={space.xxs}
                            gridTemplateRows="max-content max-content max-content"
                            key={stream.id}
                            ref={
                              index == liveAndUpcomingStreams().length - 1
                                ? ref
                                : null
                            }
                          >
                            <Grid
                              gridTemplateColumns="max-content 1fr"
                              gridGap={space.xxs}
                              alignItems="center"
                            >
                              <Avatar
                                size={36}
                                image={stream.host_detail?.photo}
                                alt={stream.host_detail?.name || ""}
                              />
                              <Text>{stream.host_detail.name}</Text>
                            </Grid>

                            <Box position="relative" h={["none", 150]}>
                              {stream.topic_detail?.image && (
                                <Image
                                  objectFit="cover"
                                  layout="fill"
                                  src={stream.topic_detail?.image}
                                  alt={stream.topic_detail.name}
                                />
                              )}

                              <Box
                                borderRadius={4}
                                py={2}
                                px={space.xxxs}
                                bg={
                                  stream.is_live
                                    ? colors.red[0]
                                    : colors.black[0]
                                }
                                position="absolute"
                                top={space.xxxs}
                                left={space.xxxs}
                              >
                                <Text textStyle="caption">
                                  {stream.is_live ? (
                                    "LIVE"
                                  ) : (
                                    <>
                                      <Span>Live On</Span>{" "}
                                      {DateTime.parse(stream.start).toFormat(
                                        DateTime.DEFAULT_FORMAT
                                      )}
                                    </>
                                  )}
                                </Text>
                              </Box>
                            </Box>

                            {stream.is_live ? (
                              <Button
                                text="Join Stream"
                                variant="round-secondary"
                                border="1px solid white"
                                bg={colors.black[5]}
                                borderRadius={50}
                                justifySelf="center"
                                alignSelf="end"
                                onClick={() => postGroupRequest(stream, true)}
                              />
                            ) : stream.rsvp ? (
                              <Button
                                text="RSVP'd"
                                variant="round-secondary"
                                color="black.2"
                                bg={colors.white[1]}
                                borderRadius={50}
                                justifySelf="center"
                                alignSelf="end"
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
                                alignSelf="end"
                                // textProps={{ minWidth: 38, px: 0 }}
                                onClick={() => postGroupRequest(stream)}
                              />
                            )}
                          </Grid>
                        );
                      }
                    })
                  )}
                </Grid>
              </Box>
            </>
          );
        }
        // TODO: Design to be confirmed for last screen of modal

        // else if (rsvpModalPage === RsvpModalPage.ExploreMore) {
        //   return (
        //     <>
        //       <Box pt={space.xxs}>
        //         <Text textStyle="headline5">Explore more on Crater</Text>
        //       </Box>
        //       <Grid
        //         gridAutoFlow="row"
        //         gridGap={space.xxs}
        //         gridAutoRows="1fr min-content"
        //       >
        //         <Box maxWidth="90%" justifySelf="center">
        //           <Video autoPlay loop muted>
        //             <source src={videoUrl} type="video/mp4" />
        //           </Video>
        //         </Box>
        //         <Grid
        //           m="0 auto"
        //           gridGap={space.xxs}
        //           justifyItems="center"
        //           w={300}
        //           alignItems="center"
        //         >
        //           <Button
        //             variant="full-width-secondary"
        //             text="Be a Creator"
        //             onClick={() => router.push("/creatorhub/faq/")}
        //           />
        //           <Button
        //             variant="full-width-secondary"
        //             text="Explore Auctions"
        //             onClick={() => router.push("/tokens/")}
        //           />
        //           <Button
        //             variant="full-width-secondary"
        //             text="Explore Other Streams"
        //             onClick={() => router.push("/")}
        //           />
        //         </Grid>
        //       </Grid>
        //     </>
        //   );
        // }
      })()}

      {rsvpModalPage === RsvpModalPage.__length - 1 ? null : (
        <Button
          text="Next"
          variant="round"
          justifySelf="center"
          onClick={goToNextScreen}
        />
      )}
    </Modal>
  );
}
