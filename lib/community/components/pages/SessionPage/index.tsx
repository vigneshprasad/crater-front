import { DateTime } from "luxon";
import { useState } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import { Avatar, Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import ExpandingText from "@/common/components/objects/ExpandingText";
import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { useWebinar } from "@/community/context/WebinarContext";
import { useWebinarRequest } from "@/community/context/WebinarRequestContext";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
} from "@/creators/types/community";

import RsvpSuccesModal from "../../objects/RsvpSuccesModal";
import UrlShare from "../../objects/UrlShare";

interface IProps {
  id: string;
  url: string;
}

export default function SessionPage({ url, id }: IProps): JSX.Element {
  const router = useRouter();
  const { webinar, mutateWebinar } = useWebinar();
  const { webinarRequest, mutateRequest } = useWebinarRequest();
  const { space, radii, colors } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!webinar) return <Box>Loading..</Box>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start, host_detail } = webinar;

  const startTime = DateTime.fromISO(start);
  const now = DateTime.now();
  const image = webinar.topic_detail?.image;
  const endtime = startTime.plus({ minutes: 120 });

  const isLiveNow = now > startTime && now <= endtime;

  const postGroupRequest = async (redirect = false): Promise<void> => {
    if (webinarRequest?.status !== RequestStatus.accepted) {
      const data: PostGroupRequest = {
        group: parseInt(id, 10),
        participant_type: ParticpantType.attendee,
        status: RequestStatus.accepted,
      };

      const [request] = await WebinarApiClient().postWebinarRequest(data);

      if (request) {
        await mutateWebinar();
        mutateRequest(request);
      }
    }

    if (redirect) {
      router.push(`/webinar/${webinar.id}`);
      return;
    }

    setShowSuccess(true);
  };

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description: "Lorem ipsum",
      }}
    >
      <>
        <RsvpSuccesModal
          url={url}
          group={webinar}
          visble={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
        <BaseLayout px={space.m} overflowY="auto">
          <Box py={space.s}>
            <Text mb={space.xs} textStyle="headline3">
              {webinar.topic_detail?.name}
            </Text>
            <Flex alignItems="center">
              <Icon size={28} icon="CalendarDays" />
              <Text textStyle="buttonLarge" ml={12}>
                {startTime.toFormat("ff")}
              </Text>
            </Flex>
          </Box>
          <Grid gridTemplateColumns="1.5fr 1fr" gridGap={space.xxl}>
            <Grid gridGap={space.xs} gridAutoFlow="row">
              {image && (
                <Box
                  h={320}
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
              <Text textStyle="title">About Session</Text>
              <Text>{webinar.topic_detail?.description}</Text>
            </Grid>
            <Grid
              gridGap={space.xs}
              gridAutoFlow="row"
              gridAutoRows="min-content"
            >
              {(() => {
                if (isLiveNow) {
                  return (
                    <Button
                      bg={colors.greenSuccess}
                      variant="full-width"
                      text="Join Session"
                      onClick={(): void => {
                        postGroupRequest(true);
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
                      borderRadius={radii.xxs}
                      py={space.xxs}
                      border={`2px solid ${colors.greenSuccess}`}
                    >
                      <Text textStyle="buttonLarge" textAlign="center">
                        Already Registered
                      </Text>
                    </Box>
                  );
                }

                return (
                  <Button
                    variant="full-width"
                    text="RSVP for this session"
                    onClick={(): void => {
                      postGroupRequest();
                    }}
                  />
                );
              })()}

              <Text textStyle="title">Spread the word</Text>

              <UrlShare url={url} />

              {/* {webinar.attendees_detail_list && (
                <AttendeesPreview attendees={webinar.attendees_detail_list} />
              )} */}

              <Text textStyle="title">Hosted by</Text>
              <Grid
                gridTemplateColumns="min-content 1fr"
                alignItems="start"
                gridGap={space.xxs}
              >
                <Avatar
                  size={56}
                  image={host_detail?.photo}
                  alt={host_detail?.name ?? "host"}
                />
                <Box>
                  <Text textStyle="bodyLarge">{host_detail?.name}</Text>
                  <ExpandingText color={colors.slate}>
                    {host_detail?.introduction}
                  </ExpandingText>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </BaseLayout>
      </>
    </Page>
  );
}
