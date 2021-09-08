import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

import { Profile } from "@/auth/types/auth";

export type IRtcUser = {
  remoteUser: IAgoraRTCRemoteUser;
  profile: Profile;
};
