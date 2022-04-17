import CRATER_LOGO from "public/images/crater_logo.png";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import { Modal, Box, Image } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import IconButton from "@/common/components/atoms/IconButton";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import WebinarApiClient from "@/community/api";
import StreamsModalPage from "@/community/components/objects/StreamsModalPage";
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

import DownloadMobileAppModalPage from "../DownloadMobileAppModalPage";
import FollowersModalPage from "../FollowersModalPage";
import ShareAndEarnModalPage from "../ShareAndEarnModalPage";

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
}

const CREATOR_MODAL_PAGES = [
  RsvpModalPage.LiveAndUpcomingStreams,
  RsvpModalPage.DiscoverFollowers,
  RsvpModalPage.DownloadMobileApp,
];

const USER_MODAL_PAGES = [
  RsvpModalPage.LiveAndUpcomingStreams,
  RsvpModalPage.DiscoverFollowers,
  RsvpModalPage.ShareAndEarn,
  RsvpModalPage.DownloadMobileApp,
];

export default function RsvpSuccesModal({
  visble,
  group,
  referralSummary,
  onClose,
}: IProps): JSX.Element | null {
  const { space } = useTheme();
  const [subscribe, setSubscribe] = useState({});
  const { subscribeCreator } = useFollower();
  const {
    streams: streamCreators,
    loading: streamCreatorsLoading,
    setStreamCreatorsPage,
  } = useStreamCreator();
  const _observer = useRef<IntersectionObserver>();
  const [currentModalPage, setCurrentModalPage] = useState<number>(0);
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

  const modalPages = useMemo(() => {
    if (profile && profile.is_creator) {
      return CREATOR_MODAL_PAGES;
    }

    return USER_MODAL_PAGES;
  }, [profile]);

  const trackModalAnalytics = useCallback(
    (eventName: string) => {
      track(eventName, {
        stream: group.id,
        stream_name: group.topic_detail?.name,
        modal_section: modalPages[currentModalPage],
      });
    },
    [currentModalPage, group, modalPages, track]
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

  const skipScreen = useCallback((): void => {
    const lastIndex = modalPages.length - 1;

    if (lastIndex - modalPages[currentModalPage] > 0) {
      setCurrentModalPage((prevValue) => prevValue + 1);
    }

    trackModalAnalytics(AnalyticsEvents.rsvp_modal_skip_clicked);
  }, [modalPages, currentModalPage, trackModalAnalytics]);

  const goToPreviousScreen = useCallback((): void => {
    if (modalPages[currentModalPage] > 0) {
      setCurrentModalPage((prevValue) => prevValue - 1);
    }

    trackModalAnalytics(AnalyticsEvents.rsvp_modal_previous_clicked);
  }, [modalPages, currentModalPage, trackModalAnalytics]);

  const shareUrl = useCallback(() => {
    if (user && profile) {
      const url = window.location.href;
      let encodedUrl = url;

      if (!profile.is_creator) {
        encodedUrl = `${url}?referrer_id=${user.pk}`;
      }

      return encodeURIComponent(encodedUrl);
    }
  }, [user, profile]);

  const pages = useMemo<
    {
      key: number;
      display: JSX.Element;
      backButton: boolean;
      skipButton: boolean;
    }[]
  >(() => {
    return [
      {
        key: RsvpModalPage.LiveAndUpcomingStreams,
        display: (
          <StreamsModalPage
            currentStream={group}
            streams={streamsToRsvp}
            loading={streamsToRsvpLoading}
            rsvpedStreams={rsvpedStreams}
            postGroupRequest={postGroupRequest}
            ref={streamsRef}
          />
        ),
        backButton: false,
        skipButton: true,
      },
      {
        key: RsvpModalPage.DiscoverFollowers,
        display: (
          <FollowersModalPage
            currentStream={group}
            streams={streamCreators}
            loading={streamCreatorsLoading}
            subscribe={subscribe}
            setSubscribe={setSubscribe}
            subscribeCreator={subscribeCreator}
            ref={followersRef}
          />
        ),
        backButton: true,
        skipButton: true,
      },
      {
        key: RsvpModalPage.ShareAndEarn,
        display: (
          <ShareAndEarnModalPage
            user={user?.pk}
            referralSummary={referralSummary}
            shareUrl={shareUrl}
            trackModalAnalytics={trackModalAnalytics}
          />
        ),
        backButton: true,
        skipButton: true,
      },
      {
        key: RsvpModalPage.DownloadMobileApp,
        display: <DownloadMobileAppModalPage />,
        backButton: true,
        skipButton: false,
      },
    ];
  }, [
    followersRef,
    group,
    postGroupRequest,
    referralSummary,
    rsvpedStreams,
    shareUrl,
    streamCreators,
    streamCreatorsLoading,
    streamsRef,
    streamsToRsvp,
    streamsToRsvpLoading,
    subscribe,
    subscribeCreator,
    trackModalAnalytics,
    user,
  ]);

  if (!user) return null;

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
      {pages.map(({ key, display, backButton, skipButton }) => {
        return (
          modalPages[currentModalPage] === key && (
            <>
              {backButton && (
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

              {display}

              {skipButton ? (
                <Button
                  text="Skip"
                  variant="round"
                  justifySelf="center"
                  onClick={skipScreen}
                />
              ) : (
                <Button
                  text="Explore"
                  variant="round"
                  justifySelf="center"
                  onClick={() => {
                    trackModalAnalytics(
                      AnalyticsEvents.rsvp_modal_explore_clicked
                    );
                    router.push(PageRoutes.pastStreams(9));
                  }}
                />
              )}
            </>
          )
        );
      })}

      {/* {modalPages[currentModalPage] !==
        RsvpModalPage.LiveAndUpcomingStreams && (
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
        if (modalPages[currentModalPage] === RsvpModalPage.DiscoverFollowers) {
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_followers_opened);
          return (
            <FollowersModalPage
              hostName={hostName}
              streams={streamCreators}
              loading={streamCreatorsLoading}
              subscribe={subscribe}
              setSubscribe={setSubscribe}
              subscribeCreator={subscribeCreator}
              ref={followersRef}
            />
          );
        } else if (
          modalPages[currentModalPage] === RsvpModalPage.LiveAndUpcomingStreams
        ) {
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_streams_opened);
          return (
            <StreamsModalPage
              currentStream={group}
              streams={streamsToRsvp}
              loading={streamsToRsvpLoading}
              rsvpedStreams={rsvpedStreams}
              postGroupRequest={postGroupRequest}
              ref={streamsRef}
            />
          );
        } else if (
          modalPages[currentModalPage] === RsvpModalPage.ShareAndEarn
        ) {
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_referral_opened);
          return (
            <ShareAndEarnModalPage
              user={user.pk}
              referralSummary={referralSummary}
              shareUrl={shareUrl}
              trackModalAnalytics={trackModalAnalytics}
            />
          );
        } else if (
          modalPages[currentModalPage] === RsvpModalPage.DownloadMobileApp
        ) {
          trackModalAnalytics(AnalyticsEvents.rsvp_modal_download_app_opened);
          return <DownloadMobileAppModalPage />;
        }
      })()}

      {modalPages[currentModalPage] === RsvpModalPage.DownloadMobileApp ? (
        <Button
          text="Explore"
          variant="round"
          justifySelf="center"
          onClick={() => {
            trackModalAnalytics(AnalyticsEvents.rsvp_modal_explore_clicked);
            router.push(PageRoutes.pastStreams(9));
          }}
        />
      ) : (
        <Button
          text="Skip"
          variant="round"
          justifySelf="center"
          onClick={skipScreen}
        />
      )} */}
    </Modal>
  );
}
