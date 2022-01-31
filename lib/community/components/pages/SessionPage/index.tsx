import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import Image from "next/image";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Avatar, Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import ExpandingText from "@/common/components/objects/ExpandingText";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import DateTime from "@/common/utils/datetime/DateTime";
import WebinarApiClient from "@/community/api";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import { useWebinar } from "@/community/context/WebinarContext";
import { useWebinarRequest } from "@/community/context/WebinarRequestContext";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Series,
} from "@/community/types/community";

import RsvpSuccesModal from "../../objects/RsvpSuccesModal";
import StreamCard from "../../objects/StreamCard";
import UrlShare from "../../objects/UrlShare";

interface IProps {
  id: string;
}

export default function SessionPage({ id }: IProps): JSX.Element {
  const router = useRouter();
  const { webinar, mutateWebinar } = useWebinar();
  const { webinarRequest, mutateRequest } = useWebinarRequest();
  const { space, radii, colors, zIndices } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const { track } = useAnalytics();
  const { upcoming } = useUpcomingStreams();
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [url, setUrl] = useState("");

  const scrollToTop = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    const location = window.location.href;
    setUrl(location);
  }, []);

  useEffect(() => {
    if (router && router.query && router.query.id) {
      if (router.query.id !== sessionId) {
        scrollToTop();
        setSessionId(router.query.id as string);
      }
    }
  }, [router, scrollToTop, sessionId, setSessionId]);

  const isHost = useMemo(() => {
    if (!user || !webinar) return false;

    return user.pk == webinar.host || webinar.speakers?.includes(user.pk);
  }, [user, webinar]);

  const postGroupRequest = useCallback(
    async (redirect = false): Promise<void> => {
      if (webinar) {
        if (webinarRequest?.status !== RequestStatus.accepted) {
          const data: PostGroupRequest = {
            group: parseInt(id, 10),
            participant_type: ParticpantType.attendee,
            status: RequestStatus.accepted,
          };

          const [request] = await WebinarApiClient().postWebinarRequest(data);

          if (request) {
            await mutateWebinar();
            track(AnalyticsEvents.rsvp_stream, {
              stream: webinar.id,
              stream_name: webinar.topic_detail?.name,
              host: {
                ...webinar.host_detail,
              },
            });
            mutateRequest(request);
          }
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

          return;
        }

        setShowSuccess(true);
      }
    },
    [webinar, id, mutateRequest, router, track, mutateWebinar, webinarRequest]
  );

  const { data: seriesData } = useSWR<Series>(
    webinar && webinar.series !== null
      ? `${API_URL_CONSTANTS.series.getAllSeries}${webinar.series}/`
      : null
  );

  const series = useMemo(() => {
    return seriesData;
  }, [seriesData]);

  const postSeriesRequest = useCallback(async (): Promise<void> => {
    if (webinar && webinar?.series !== null && seriesData) {
      if (webinarRequest?.status !== RequestStatus.accepted) {
        const [requests] = await WebinarApiClient().postSeriesRequest(
          webinar.series
        );

        if (requests && requests.length > 0) {
          const request = requests.find(
            (request) => request.group === webinar.id
          );

          track(AnalyticsEvents.rsvp_series, {
            series: webinar.series,
            series_name: seriesData.topic_detail.name,
            stream: webinar.id,
            stream_name: webinar.topic_detail?.name,
            host: {
              ...seriesData.host_detail,
            },
          });
          mutateRequest(request);
        }
      }

      setShowSuccess(true);
    }
  }, [mutateRequest, seriesData, track, webinar, webinarRequest]);

  useEffect(() => {
    const action = async (): Promise<void> => {
      webinar?.series === null
        ? await postGroupRequest()
        : await postSeriesRequest();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { join, ...query } = router.query;
      router.replace({ query: { ...query } });
    };

    if (
      router.query?.join === "true" &&
      user &&
      postGroupRequest &&
      webinar &&
      postSeriesRequest
    ) {
      action();
    }
  }, [router, user, webinar, postGroupRequest, postSeriesRequest]);

  if (!webinar || !upcoming || !seriesData) return <Box>Loading..</Box>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start, host_detail } = webinar;

  const startTime = DateTime.parse(start);
  const now = DateTime.now();

  const image = webinar.topic_detail?.image;

  const rsvpBtnText = webinar.is_live
    ? "Join Stream"
    : webinar.series !== null
    ? `RSVP for the series`
    : "RSVP for this session";

  return (
    <>
      <RsvpSuccesModal
        group={webinar}
        visble={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <BaseLayout
        // px={[space.xs, space.m]}
        overflowY="auto"
        // pb={[space.l, space.l]}
        aside={<AsideNav />}
        ref={scrollContainerRef}
      >
        <Box px={[space.xs, space.m]} pb={[space.l, space.xxs]}>
          <Grid gridTemplateColumns={["1fr", "1.5fr 1fr"]} gridGap={space.xxl}>
            <Box py={space.s}>
              <Text textStyle="headline3">{webinar.topic_detail?.name}</Text>
              <Text textStyle="headline6">{seriesData?.topic_detail.name}</Text>
            </Box>
          </Grid>
          <Grid gridTemplateColumns={["1fr", "1.5fr 1fr"]} gridGap={space.xxl}>
            <Grid
              gridGap={[space.xs, space.xxs]}
              gridAutoFlow="row"
              gridAutoRows="min-content"
            >
              <Flex alignItems="center">
                <Icon size={24} icon="CalendarDays" />
                <Text textStyle="captionLarge" ml={12}>
                  {startTime.toFormat("ff")}
                </Text>
              </Flex>
              {image && (
                <Box
                  w="100%"
                  pt="56.25%"
                  position="relative"
                  borderRadius={radii.xs}
                  overflow="hidden"
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    src={image}
                    alt={webinar.topic_detail?.name}
                  />
                </Box>
              )}

              {webinar.topic_detail?.description && (
                <>
                  <Text textStyle="title">Talking About</Text>
                  <ExpandingText maxLines={4}>
                    {webinar.topic_detail.description}
                  </ExpandingText>
                </>
              )}
            </Grid>
            <Grid
              gridGap={space.xs}
              gridAutoFlow="row"
              gridAutoRows="min-content"
            >
              <Box
                position={["fixed", "static"]}
                bottom={[20, "auto"]}
                left={[16, "auto"]}
                right={[16, "auto"]}
                zIndex={[zIndices.overlay - 10, "auto"]}
              >
                {(() => {
                  if (!user) {
                    return (
                      <Button
                        variant="full-width"
                        text={rsvpBtnText}
                        onClick={(): void => {
                          router.replace({
                            query: {
                              ...router.query,
                              join: true,
                              newUser: true,
                            },
                          });
                          openModal();
                        }}
                      />
                    );
                  }

                  if (isHost) {
                    if (startTime.minus({ minutes: 5 }) > now) {
                      return (
                        <Box
                          bg={colors.black[5]}
                          borderRadius={radii.xxs}
                          py={space.xxs}
                          border={`2px solid ${colors.accent}`}
                        >
                          <Text textStyle="buttonLarge" textAlign="center">
                            {`Meeting scheduled for ${startTime.toFormat(
                              DateTime.DEFAULT_FORMAT
                            )}`}
                          </Text>
                        </Box>
                      );
                    }
                    return (
                      <Button
                        variant="full-width"
                        text="Go Live"
                        onClick={(): void => {
                          router.push(PageRoutes.stream(webinar.id.toString()));
                        }}
                      />
                    );
                  }

                  if (
                    webinar.is_live ||
                    (startTime.minus({ minutes: 10 }) < now &&
                      startTime.plus({ minutes: 10 }) > now)
                  ) {
                    return (
                      <Button
                        variant="full-width"
                        text={isHost ? "Return to stream" : "Join Stream"}
                        onClick={(): void => {
                          if (!isHost) {
                            postGroupRequest(true);
                          } else {
                            router.push(
                              PageRoutes.stream(webinar.id.toString())
                            );
                          }
                        }}
                      />
                    );
                  }

                  if (
                    webinarRequest &&
                    webinarRequest.status === RequestStatus.accepted
                  ) {
                    return (
                      <Box
                        bg={colors.black[5]}
                        borderRadius={radii.xxs}
                        py={space.xxs}
                        border={`2px solid ${colors.accent}`}
                      >
                        <Text textStyle="buttonLarge" textAlign="center">
                          {`You will be notified when ${host_detail?.name} is live`}
                        </Text>
                      </Box>
                    );
                  }

                  return (
                    <Button
                      variant="full-width"
                      text={rsvpBtnText}
                      onClick={(): void => {
                        webinar.series === null
                          ? postGroupRequest()
                          : postSeriesRequest();
                      }}
                    />
                  );
                })()}
              </Box>

              <Text
                pt={space.xxs}
                borderTop="1px solid rgba(255, 255, 255, 0.1)"
                textStyle="caption"
              >
                Let others know
              </Text>

              <UrlShare />

              <Grid
                gridTemplateColumns="1fr 1fr"
                alignItems="start"
                gridGap={space.xxs}
              >
                <a
                  href={`//www.linkedin.com/shareArticle?mini=true&url=${url}&title=${webinar.topic_detail?.name}`}
                  target="_blank"
                  rel="noreferrer"
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
                    onClick={(): void => {
                      track(AnalyticsEvents.share_stream_url, {
                        social_provider: "linkedin",
                      });
                    }}
                  />
                </a>
                <a
                  href={`//twitter.com/share?text=${webinar.topic_detail?.name}&url=${url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="full-width"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    bg={colors.black[5]}
                    prefixElement={
                      <Icon
                        size={20}
                        icon="Twitter"
                        fill
                        color={colors.white[0]}
                      />
                    }
                    text="Tweet"
                    onClick={(): void => {
                      track(AnalyticsEvents.share_stream_url, {
                        social_provider: "twitter",
                      });
                    }}
                  />
                </a>
              </Grid>

              {/* {webinar.attendees_detail_list && (
                <AttendeesPreview attendees={webinar.attendees_detail_list} />
              )} */}

              <Text
                pt={space.xxs}
                borderTop="1px solid rgba(255, 255, 255, 0.1)"
                textStyle="title"
              >
                Speakers
              </Text>
              <Grid
                gridTemplateColumns="min-content 1fr"
                alignItems="start"
                gridGap={space.xxs}
              >
                {webinar.speakers_detail_list &&
                  webinar.speakers_detail_list.map((speaker) => (
                    <>
                      <Avatar
                        size={56}
                        image={speaker?.photo}
                        alt={speaker?.name ?? "host"}
                      />
                      <Box>
                        <Text textStyle="bodyLarge">{speaker?.name}</Text>
                        <ExpandingText color={colors.slate}>
                          {speaker?.introduction}
                        </ExpandingText>
                      </Box>
                    </>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {webinar.series !== null ? (
          <Box>
            <Box px={[space.xxs, space.s]} py={space.xs}>
              <Text textStyle="headlineBold">More from the series</Text>
            </Box>

            <Grid
              px={space.s}
              gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}
              gridGap={space.s}
            >
              {series?.groups_detail_list.map((stream) => {
                if (stream.id !== webinar.id) {
                  return <StreamCard stream={stream} key={stream.id} />;
                }
              })}
            </Grid>
          </Box>
        ) : null}

        <Box pb={space.s}>
          <Box px={[space.xxs, space.s]} py={space.xs}>
            <Text textStyle="headlineBold">Upcoming Streams</Text>
          </Box>

          <Grid
            px={space.s}
            gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}
            gridGap={space.s}
          >
            {upcoming.map((stream) => {
              if (stream.id !== webinar.id) {
                return <StreamCard stream={stream} key={stream.id} />;
              }
            })}
          </Grid>
        </Box>
      </BaseLayout>
    </>
  );
}
