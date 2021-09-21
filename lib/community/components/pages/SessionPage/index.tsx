import { DateTime } from "luxon";
import { useState } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  Link,
} from "@/common/components/atoms";
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
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  if (!webinar) return <Box>Loading..</Box>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start, host_detail } = webinar;

  const formatted = start.replace("T", " ").replace(".000000", "");

  const startTime = DateTime.fromFormat(formatted, "yyyy-MM-dd HH:mm:ss ZZZ");

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
        <BaseLayout
          px={[space.xs, space.m]}
          overflowY="auto"
          pb={[space.l, space.l]}
        >
          <Grid gridTemplateColumns={["1fr", "1.5fr 1fr"]} gridGap={space.xxl}>
            <Box py={space.s}>
              <Text textStyle="headline3">{webinar.topic_detail?.name}</Text>
            </Box>
          </Grid>
          <Grid gridTemplateColumns={["1fr", "1.5fr 1fr"]} gridGap={space.xxl}>
            <Grid gridGap={[space.xs, space.xxs]} gridAutoFlow="row">
              <Flex alignItems="center">
                <Icon size={24} icon="CalendarDays" />
                <Text textStyle="captionLarge" ml={12}>
                  {startTime.toFormat("ff")}
                </Text>
              </Flex>
              {image && (
                <Box
                  h={320}
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
              <Text textStyle="title">Talking About</Text>
              <Text>{webinar.topic_detail?.description}</Text>
            </Grid>
            <Grid
              gridGap={space.xs}
              gridAutoFlow="row"
              gridAutoRows="min-content"
            >
              {(() => {
                if (!user) {
                  return (
                    <Button
                      variant="full-width"
                      text="Notify Me"
                      onClick={(): void => {
                        openModal();
                      }}
                    />
                  );
                }

                if (isLiveNow) {
                  return (
                    <Button
                      variant="full-width"
                      text="Join Stream"
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
                    text="Notify Me"
                    onClick={(): void => {
                      postGroupRequest();
                    }}
                  />
                );
              })()}

              <Text
                pt={space.xxs}
                borderTop="1px solid rgba(255, 255, 255, 0.1)"
                textStyle="caption"
              >
                Let others know
              </Text>

              <UrlShare url={url} />

              <Grid
                gridTemplateColumns="1fr 1fr"
                alignItems="start"
                gridGap={space.xxs}
              >
                <Link
                  passHref
                  href={`//www.linkedin.com/shareArticle?mini=true&url=${url}&title=${webinar.topic_detail?.name}`}
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
                  href={`//twitter.com/share?text=${webinar.topic_detail?.name}&url=${url}`}
                  boxProps={{ target: "_blank" }}
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
                  />
                </Link>
              </Grid>

              {/* {webinar.attendees_detail_list && (
                <AttendeesPreview attendees={webinar.attendees_detail_list} />
              )} */}

              <Text
                pt={space.xxs}
                borderTop="1px solid rgba(255, 255, 255, 0.1)"
                textStyle="title"
              >
                About Me
              </Text>
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
