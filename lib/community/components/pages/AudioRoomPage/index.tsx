import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import AgoraApiClient from "@/agora/api";
import { useRtcClient } from "@/agora/hooks";
import agoraClient from "@/agora/utils/agoraClient";
import { useUser } from "@/auth/hooks";
import { Grid, Box, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import HorizontalNav from "@/common/components/objects/HorizontalNav";
import Page from "@/common/components/objects/Page";
import { useRoom } from "@/community/hooks";

import AudioRoomLayout from "../../layout/AudioRoomLayout";
import AudioCall from "../../objects/AudioCall";

export default function AudioRoomPage(): JSX.Element | null {
  const router = useRouter();
  const param = router.query.roomId as string;
  const id = parseInt(param, 10);
  const { room, loading } = useRoom({ id });
  const { space, radii } = useTheme();
  const { user } = useUser();

  const { joinChannel, leave, connectionState, remoteUsers, muted, mute } =
    useRtcClient({
      client: agoraClient,
    });

  const handleJoinCall = async (): Promise<void> => {
    if (room) {
      const { data } = await AgoraApiClient.getRoomToken(room.id);

      await joinChannel(data.channel_name, data.token, user?.pk);
    }
  };

  const handleLeaveCall = async (): Promise<void> => {
    await leave();
  };

  const handleMutedClick = (): void => {
    mute();
  };

  if (loading || !room) return null;

  return (
    <Page
      seo={{ title: room.topic_detail?.name, description: room.description }}
    >
      <AudioRoomLayout>
        <HorizontalNav />
        {connectionState === "DISCONNECTED" && (
          <Grid gridTemplateColumns="2fr 1fr" px={[space.m]} py={[space.xl]}>
            <Box
              m="auto auto"
              w="70%"
              h="70%"
              backgroundPosition="center"
              borderRadius={radii.xs}
              backgroundImage={`url(${room?.topic_detail?.image})`}
              backgroundSize="cover"
            />
            <Box m="auto auto" textAlign="center">
              <Text textStyle="headline5" mb={[space.xs]}>
                {room?.topic_detail?.name}
              </Text>
              <Text mb={[space.s]}>No one else on call.</Text>
              <Button text="Join Call" onClick={handleJoinCall} />
            </Box>
          </Grid>
        )}
        {connectionState === ("CONNECTED" || "CONNECTING") && (
          <AudioCall
            muted={muted}
            remoteUsers={remoteUsers}
            onLeaveClick={handleLeaveCall}
            onMutedClick={handleMutedClick}
            room={room}
          />
        )}
      </AudioRoomLayout>
    </Page>
  );
}
