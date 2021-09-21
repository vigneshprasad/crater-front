import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { Profile } from "next-auth";

export type IRtcUser = {
  remoteUser: IAgoraRTCRemoteUser;
  profile: Profile;
};
