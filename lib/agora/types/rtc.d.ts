import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

import { UserProfile } from "@/auth/types/auth";

export type IRtcUser = {
  remoteUser: IAgoraRTCRemoteUser;
  profile: UserProfile;
};
