import { DyteMeeting } from "dyte-client";
import { useTheme } from "styled-components";

import { Avatar, Box, Grid, Text } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
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
            Items
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
