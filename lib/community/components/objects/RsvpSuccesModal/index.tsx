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
  Flex,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import IconButton from "@/common/components/atoms/IconButton";
import AppLink, { AppLinkType } from "@/common/components/objects/AppLink";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import DateTime from "@/common/utils/datetime/DateTime";
import WebinarApiClient from "@/community/api";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import useStreamCreator from "@/stream/context/StreamCreatorContext";
import useStreamsToRsvp from "@/stream/context/StreamsToRsvpContext";
import { ReferralSummary } from "@/tokens/types/referrals";

import ReferralStepsStatic from "../../../../tokens/components/objects/ReferralStepsStatic";
import TrackReferralsBox from "../TrackReferralsBox";
import UrlShare from "../UrlShare";

interface IProps {
  group: Webinar;
  referralSummary?: ReferralSummary;
  visble: boolean;
  onClose: () => void;
}

enum RsvpModalPage {
  LiveAndUpcomingStreams,
  DiscoverFollowers,
  ShareAndEarn,
  DownloadMobileApp,
  __length,
}

export default function RsvpSuccesModal({
  visble,
  group,
  referralSummary,
  onClose,
}: IProps): JSX.Element | null {
  const { space, colors, radii } = useTheme();
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
    RsvpModalPage.LiveAndUpcomingStreams
  );
  const {
    streams: streamsToRsvp,
    loading: streamsToRsvpLoading,
    setStreamsToRsvpPage,
    nextPage: streamsToRsvpNextPage,
  } = useStreamsToRsvp();
  const { track } = useAnalytics();
  const router = useRouter();
  const { user, profile } = useAuth();
  const [rsvpedStreams, setRsvpedStreams] = useState<number[]>([]);

  const trackModalAnalytics = useCallback(
    (eventName: string) => {
      console.log("event: ", eventName);

      track(eventName, {
        stream: group.id,
        stream_name: group.topic_detail?.name,
        modal_section: RsvpModalPage[rsvpModalPage],
      });
    },
    [group, rsvpModalPage, track]
  );

  const onCloseModal = useCallback(() => {
    setRsvpedStreams([]);
    setSubscribe({});
    onClose();
  }, [onClose, setRsvpedStreams, setSubscribe]);

  const followersRef = useCallback(
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
    [streamCreatorsLoading, setStreamCreatorsPage]
  );

  const streamsRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (streamsToRsvpLoading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          streamsToRsvpNextPage && setStreamsToRsvpPage((page) => page + 1);
        }
      });
      if (node != null) _observer.current.observe(node);
    },
    [setStreamsToRsvpPage, streamsToRsvpNextPage, streamsToRsvpLoading]
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
        setRsvpedStreams((prev) => [...prev, webinar.id]);
        track(AnalyticsEvents.rsvp_stream, {
          page: "RSVP modal",
          stream: webinar.id,
          stream_name: webinar.topic_detail?.name,
          host: {
            ...webinar.host_detail,
          },
        });
      }

      if (redirect) {
        track(AnalyticsEvents.join_stream, {
          page: "RSVP modal",
          stream: webinar.id,
          stream_name: webinar.topic_detail?.name,
          host: {
            ...webinar.host_detail,
          },
        });
        router.push(PageRoutes.stream(webinar.id.toString()));
      }
    },
    [track, router]
  );

  const skipScreen = useCallback(async (): Promise<void> => {
    let skipValue = 1;
    if (
      profile?.is_creator &&
      rsvpModalPage === RsvpModalPage.DiscoverFollowers
    ) {
      skipValue = 2;
    }

    if (rsvpModalPage === RsvpModalPage.__length) {
      // Clear `rsvpedStreams` and `subscribe` state
      setRsvpedStreams([]);
      setSubscribe({});

      onCloseModal();
    } else {
      if (RsvpModalPage.__length - rsvpModalPage - 1 > 0) {
        setRsvpModalPage((prevValue) => prevValue + skipValue);
      }
    }

    trackModalAnalytics(AnalyticsEvents.rsvp_modal_skip_clicked);
  }, [profile, onCloseModal, rsvpModalPage, trackModalAnalytics]);

  const goToPreviousScreen = useCallback(async (): Promise<void> => {
    let skipValue = 1;
    if (
      profile?.is_creator &&
      rsvpModalPage === RsvpModalPage.DownloadMobileApp
    ) {
      skipValue = 2;
    }

    if (rsvpModalPage > 0) {
      setRsvpModalPage((prevValue) => prevValue - skipValue);
    }

    trackModalAnalytics(AnalyticsEvents.rsvp_modal_previous_clicked);
  }, [profile, rsvpModalPage, trackModalAnalytics]);

  const shareUrl = useCallback(() => {
    const url = window.location.href;
    let encodedUrl = url;

    if (user && profile && !profile?.is_creator) {
      encodedUrl = `${url}?referrer_id=${user.pk}`;
    }

    return encodeURIComponent(encodedUrl);
  }, [user, profile]);

  if (!user) return null;

  const text = `
    We will notify you prior to the stream with ${hostName}.
    You can also follow other creators to get notified when they are live on Crater.
  `;

  const referralShareText = `Hey,\n\nI will be joining this livestream on Crater.Club: a live streaming & auctions platform for creators & educators. 
  \nSharing the link with you as I think you will enjoy the content & the interaction with the streamer.`;

  return (
    <Modal
      display="grid"
      gridTemplateRows="max-content max-content 1fr max-content"
      maxWidth={600}
      visible={visble}
      onClose={onCloseModal}
      overflowY={["auto", "hidden"]}
      px={[space.xxs, space.xs]}
      py={space.xxs}
      gridGap={space.xxs}
    >
      {rsvpModalPage !== RsvpModalPage.LiveAndUpcomingStreams && (
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
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_followers_opened);
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
                {streamCreatorsLoading
                  ? Array(3)
                      .fill("")
                      .map((_, index) => (
                        <Shimmer
                          w="100%"
                          h={55}
                          mb={space.xxs}
                          borderRadius={radii.xxs}
                          key={index}
                        />
                      ))
                  : streamCreators?.map((streamCreator, index) => (
                      <Grid
                        mb={space.xxs}
                        gridGap={space.xxs}
                        gridTemplateColumns="max-content 1fr max-content"
                        alignItems="center"
                        key={streamCreator.id}
                        ref={
                          index == streamCreators.length - 1
                            ? followersRef
                            : null
                        }
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
                            {streamCreator.is_live
                              ? "Live Now: "
                              : "Upcoming: "}
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
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_streams_opened);
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
                  {streamsToRsvpLoading
                    ? Array(4)
                        .fill("")
                        .map((_, index) => (
                          <Shimmer
                            w="100%"
                            h={250}
                            borderRadius={radii.xxs}
                            key={index}
                          />
                        ))
                    : streamsToRsvp?.map((stream, index) => {
                        if (stream.id !== group.id) {
                          return (
                            <Grid
                              gridAutoFlow="row"
                              gridGap={space.xxs}
                              gridTemplateRows="max-content max-content max-content"
                              key={stream.id}
                              ref={
                                index == streamsToRsvp.length - 1
                                  ? streamsRef
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
                              ) : rsvpedStreams?.includes(stream.id) ? (
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
        } else if (rsvpModalPage === RsvpModalPage.ShareAndEarn) {
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_referral_opened);
          return (
            <>
              <Box pt={space.xxs}>
                <Text textStyle="headline5">Share and Earn</Text>
              </Box>

              <Box>
                <Text pb={space.xxs} textStyle="captionLarge">
                  Earn ₹100 for each friend you refer 🎉
                </Text>

                <UrlShare referrer={user.pk} />

                <Flex
                  pt={space.xs}
                  flexDirection="row"
                  gridGap={space.xs}
                  justifyContent="space-evenly"
                >
                  <IconButton
                    variant="flat"
                    icon="Whatsapp"
                    iconProps={{
                      color: colors.white[0],
                      fill: true,
                      size: [20, 30],
                    }}
                    onClick={() =>
                      trackModalAnalytics(
                        AnalyticsEvents.rsvp_modal_referral_whatsapp_share
                      )
                    }
                  />

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=false&url=${shareUrl()}&title=${
                      group.topic_detail?.name
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton
                      variant="flat"
                      icon="Linkedin"
                      iconProps={{
                        color: colors.white[0],
                        fill: true,
                        size: [20, 30],
                      }}
                      onClick={() =>
                        trackModalAnalytics(
                          AnalyticsEvents.rsvp_modal_referral_linkedin_share
                        )
                      }
                    />
                  </a>

                  <a
                    href={`https://twitter.com/share?text=${encodeURIComponent(
                      referralShareText
                    )}&url=${shareUrl()}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton
                      variant="flat"
                      icon="Twitter"
                      iconProps={{
                        color: colors.white[0],
                        fill: true,
                        size: [20, 30],
                      }}
                      onClick={() =>
                        trackModalAnalytics(
                          AnalyticsEvents.rsvp_modal_referral_twitter_share
                        )
                      }
                    />
                  </a>
                </Flex>

                <Grid
                  pt={space.xs}
                  gridTemplateColumns={["1fr", "1fr auto"]}
                  gridTemplateRows={["1fr auto", "1fr"]}
                  gridGap={space.xxs}
                >
                  <Box>
                    <Text textStyle="headline6" pb={space.xxxs}>
                      How it works?
                    </Text>
                    <ReferralStepsStatic imageSize={30} />
                  </Box>
                  <TrackReferralsBox referralSummary={referralSummary} />
                </Grid>
              </Box>
            </>
          );
        } else if (rsvpModalPage === RsvpModalPage.DownloadMobileApp) {
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_download_app_opened);
          return (
            <>
              <Box pt={space.xxs}>
                <Text textStyle="headline5">Never miss a stream!</Text>
                <Text>Get the android app</Text>
              </Box>

              <Box justifySelf="center" alignSelf="center">
                <Image
                  src="/images/img_android_app_qr_code.png"
                  alt="QR code"
                  objectFit="cover"
                  boxProps={{
                    w: [200, 300],
                  }}
                />

                <Flex pt={[space.xxxs, space.xxs]} justifyContent="center">
                  <AppLink
                    buttonType={AppLinkType.android}
                    analyticsEventName={
                      AnalyticsEvents.rsvp_modal_google_play_badge_clicked
                    }
                  />
                </Flex>
              </Box>
            </>
          );
        }
      })()}

      {rsvpModalPage === RsvpModalPage.__length - 1 ? (
        <Button
          text="Explore"
          variant="round"
          justifySelf="center"
          onClick={() => {
            trackModalAnalytics(AnalyticsEvents.rsvp_modal_explore_clicked);
            router.push(PageRoutes.pastStreams(1));
          }}
        />
      ) : (
        <Button
          text="Skip"
          variant="round"
          justifySelf="center"
          onClick={skipScreen}
        />
      )}
    </Modal>
  );
}
