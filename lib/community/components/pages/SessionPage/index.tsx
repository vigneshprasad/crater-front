import moment from "moment";
import { useState } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { useWebinar } from "@/community/context/WebinarContext";
import { useWebinarRequest } from "@/community/context/WebinarRequestContext";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
} from "@/creators/types/community";

import AttendeesPreview from "../../objects/AttendeesPreview";
import RsvpSuccesModal from "../../objects/RsvpSuccesModal";
import UrlShare from "../../objects/UrlShare";

interface IProps {
  id: string;
  url: string;
}

export default function SessionPage({ url, id }: IProps): JSX.Element {
  const { webinar, mutateWebinar } = useWebinar();
  const { webinarRequest, mutateRequest } = useWebinarRequest();
  const { space, radii, colors } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!webinar) return <Box>Loading..</Box>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start, host_detail } = webinar;

  const startTime = moment.parseZone(start).local().format("LLL");
  const image = webinar.topic_detail?.image;

  const postGroupRequest = async (): Promise<void> => {
    const data: PostGroupRequest = {
      group: parseInt(id, 10),
      participant_type: ParticpantType.attendee,
      status: RequestStatus.accepted,
    };

    const [request] = await WebinarApiClient().postWebinarRequest(data);

    if (request) {
      await mutateWebinar();
      mutateRequest(request);
      setShowSuccess(true);
    }
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
                {startTime}
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
              <Text>{webinar.description}</Text>
            </Grid>
            <Grid
              gridGap={space.xs}
              gridAutoFlow="row"
              gridAutoRows="min-content"
            >
              {!webinarRequest && (
                <Button
                  variant="full-width"
                  text="RSVP for this session"
                  onClick={(): void => {
                    postGroupRequest();
                  }}
                />
              )}

              {webinarRequest &&
                webinarRequest.status === RequestStatus.accepted && (
                  <Box
                    borderRadius={radii.xxs}
                    py={space.xxs}
                    border={`2px solid ${colors.greenSuccess}`}
                  >
                    <Text textStyle="buttonLarge" textAlign="center">
                      Already Registered
                    </Text>
                  </Box>
                )}

              <Text textStyle="title">Spread the word</Text>

              <UrlShare url={url} />

              {webinar.attendees_detail_list && (
                <AttendeesPreview attendees={webinar.attendees_detail_list} />
              )}

              <Text textStyle="title">Hosted by</Text>
              <Grid
                gridTemplateColumns="min-content 1fr"
                alignItems="center"
                gridGap={space.xxs}
              >
                <Avatar
                  size={56}
                  image={host_detail?.photo}
                  alt={host_detail?.name ?? "host"}
                />
                <Box>
                  <Text textStyle="bodyLarge">{host_detail?.name}</Text>
                  <Text
                    maxLines={2}
                    overflow="hidden"
                    color={colors.slate}
                    fontWeight="400"
                    textStyle="captionLarge"
                  >
                    {host_detail?.introduction}
                  </Text>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </BaseLayout>
      </>
    </Page>
  );
}
