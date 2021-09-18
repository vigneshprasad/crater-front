import { DyteMeeting } from "dyte-client";
import { DateTime } from "luxon";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Grid, Text } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import { useWebinar } from "@/community/context/WebinarContext";
import { DyteParticpant } from "@/dyte/types/dyte";

interface IProps {
  orgId: string;
  dyteParticipant: DyteParticpant | null;
}

export default function WebinarPage({
  orgId,
  dyteParticipant,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { webinar, loading } = useWebinar();
  const { upcoming, loading: upcomingLoading } = useUpcomingStreams();

  if (loading || !webinar) return <Box>Loading...</Box>;

  return (
    <BaseLayout overflowY="auto">
      <Box px={space.s} py={space.xs} />

      <Grid
        py={space.xxs}
        px={space.s}
        gridTemplateColumns="2fr 1fr"
        gridGap={space.s}
      >
        <Box>
          <Box
            h="100%"
            maxHeight={480}
            position="relative"
            borderRadius={radii.s}
            overflow="hidden"
          >
            {dyteParticipant && (
              <DyteMeeting
                uiConfig={{
                  header: false,
                  controlBarElements: {
                    polls: false,
                    chat: false,
                    plugins: false,
                    participants: false,
                  },
                  dimensions: {
                    mode: "fillParent",
                  },
                }}
                clientId={orgId}
                meetingConfig={{
                  roomName: dyteParticipant.dyte_meeting_detail.room_name,
                  authToken: dyteParticipant.auth_token,
                }}
                onInit={(meeting) => {
                  // eslint-disable-next-line no-console
                  console.log(meeting);
                }}
              />
            )}
          </Box>
          <Grid py={space.s} gridGap={space.xs}>
            <Grid
              gridTemplateColumns="min-content 1fr"
              gridGap={space.xs}
              alignItems="center"
            >
              <Avatar
                size={56}
                image={webinar.host_detail?.photo}
                alt="host photo"
              />
              <Box>
                <Text mb={4} textStyle="title">
                  {webinar.host_detail?.name}
                </Text>
                <Text
                  maxWidth="40%"
                  textStyle="caption"
                  maxLines={1}
                  color={colors.white[1]}
                >
                  {webinar.host_detail?.introduction}
                </Text>
              </Box>
            </Grid>
            <Text mt={space.xs} textStyle="headline5">
              {webinar.topic_detail?.name}
            </Text>
            <Text>{webinar.description}</Text>
          </Grid>
        </Box>

        <Box>
          <Text px={space.xxs} textStyle="headline6">
            Similar Streams
          </Text>

          <Grid
            bg={colors.black[4]}
            my={space.xs}
            p={space.xs}
            borderRadius={radii.xxs}
            maxHeight={420}
            h="100%"
          >
            {((): JSX.Element => {
              if (upcomingLoading || !upcoming) return <Box>Loading...</Box>;

              return (
                <Grid gridAutoFlow="row" gridGap={space.xs}>
                  {upcoming.map((stream) => {
                    const timeDisplay = DateTime.fromISO(
                      stream.start
                    ).toLocaleString(DateTime.DATETIME_FULL);
                    return (
                      <Grid
                        alignItems="start"
                        key={stream.id}
                        gridGap={space.xs}
                        gridTemplateColumns="min-content 1fr"
                      >
                        <Box
                          position="relative"
                          h={72}
                          w={96}
                          borderRadius={radii.xxs}
                          overflow="hidden"
                        >
                          {stream.topic_detail?.image && (
                            <Image
                              objectFit="cover"
                              src={stream.topic_detail?.image}
                              alt={stream.topic_detail?.name}
                              layout="fill"
                            />
                          )}
                        </Box>
                        <Box py={space.xxxs}>
                          <Text textStyle="title" py={4}>
                            {stream.topic_detail?.name}
                          </Text>
                          <Text textStyle="caption" color={colors.slate}>
                            {timeDisplay}
                          </Text>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              );
            })()}
          </Grid>

          <Text px={space.xxs} textStyle="headline6">
            Nishants Club
          </Text>
          <Grid
            bg={colors.black[4]}
            my={space.xs}
            p={space.xs}
            borderRadius={radii.xxs}
            maxHeight={420}
            h="100%"
          >
            Items
          </Grid>
        </Box>
      </Grid>
    </BaseLayout>
  );
}
