import AgoraRTC, {
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IMicrophoneAudioTrack,
  MicrophoneAudioTrackInitConfig,
  UID,
} from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import AuthApiClient from "@/auth/api";

import { IRtcUser } from "../types/rtc";

type IVolumeLevel = {
  level: number;
  uid: UID;
};

export type IUseRtcClientProps = {
  client: IAgoraRTCClient;
};

export type IUseRtcClientState = {
  muted: boolean;
  volumeLevels: IVolumeLevel[];
  connectionState: ConnectionState;
  remoteUsers: Map<string, IRtcUser>;
  localAudioTrack?: ILocalAudioTrack;
  joinChannel: (channel: string, token: string, uid?: string) => Promise<void>;
  leave: () => Promise<void>;
  mute: () => Promise<void>;
};

const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;

export function useRtcClient({
  client,
}: IUseRtcClientProps): IUseRtcClientState {
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined);

  const [remoteUsers, setRemoteUsers] = useState<Map<string, IRtcUser>>(
    new Map()
  );
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    client.connectionState
  );
  const [volumeLevels, setVolumeLevels] = useState<IVolumeLevel[]>([]);
  const [localMuted, setLocalMuted] = useState(false);

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig
  ): Promise<IMicrophoneAudioTrack> {
    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack(audioConfig);
    setLocalAudioTrack(audioTrack);
    return audioTrack;
  }

  async function joinChannel(
    channel: string,
    token: string,
    uid?: string
  ): Promise<void> {
    const audioTrack = await createLocalTracks();
    client.enableAudioVolumeIndicator();
    await client.join(AGORA_APP_ID, channel, token, uid);
    await client.publish([audioTrack]);
  }

  async function leave(): Promise<void> {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }

    setRemoteUsers(new Map());
    await client.leave();
  }

  async function mute(): Promise<void> {
    if (localAudioTrack) {
      await localAudioTrack.setMuted(!localMuted);
      setLocalMuted((state) => !state);
    }
  }

  useEffect(() => {
    const handleUserJoined = async (user: IAgoraRTCRemoteUser) => {
      const res = await AuthApiClient.getUserProfile(user.uid.toString());
      const { data } = res;
      setRemoteUsers((state) =>
        state.set(data.uuid, {
          remoteUser: user,
          profile: data,
        })
      );
    };

    const handleConnectionChange = (state: ConnectionState) => {
      setConnectionState(state);
    };

    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((state) => {
        state.delete(user.uid.toString());
        return state;
      });
    };

    const handleVolumeIndicatorChange = (volumes: IVolumeLevel[]) => {
      setVolumeLevels(volumes);
    };

    const handleUserPublished = async (
      remoteUser: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      const track = await client.subscribe(remoteUser, mediaType);

      if (track.trackMediaType === "audio") {
        track.play();
      }
    };

    const handleUserUnpublished = async (
      remoteUser: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      await client.unsubscribe(remoteUser, mediaType);
      if (mediaType === "audio") {
        if (remoteUser.audioTrack?.isPlaying) {
          remoteUser.audioTrack.stop();
        }
      }
    };

    client.on("user-joined", handleUserJoined);
    client.on("connection-state-change", handleConnectionChange);
    client.on("user-left", handleUserLeft);
    client.on("volume-indicator", handleVolumeIndicatorChange);
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);

    return () => {
      client.off("user-joined", handleUserJoined);
      client.off("connection-state-change", handleConnectionChange);
      client.off("user-left", handleUserLeft);
      client.off("volume-indicator", handleVolumeIndicatorChange);
    };
  }, [client]);

  return {
    muted: localMuted,
    volumeLevels,
    connectionState,
    remoteUsers,
    localAudioTrack,
    joinChannel,
    leave,
    mute,
  };
}
