import { useCallback } from "react";
import { useTheme } from "styled-components";

import { IRtcUser } from "@/agora/types/rtc";
import { Grid } from "@/common/components/atoms";
import { Speaker } from "@/creators/types/community";

import SpeakerItem from "../SpeakerItem";

type IProps = {
  host?: Speaker;
  remoteUsers: Map<string, IRtcUser>;
};

const SpeakersList = ({ host, remoteUsers }: IProps) => {
  const { space } = useTheme();

  const renderRemoteUsers = useCallback(() => {
    const array = Array.from(remoteUsers.values());
    return array.map((value) => (
      <SpeakerItem
        key={value.profile.uuid}
        photo={value.profile.photo}
        name={value.profile.name}
        remoteUser={value.remoteUser}
      />
    ));
  }, [remoteUsers]);

  return (
    <Grid
      py={[space.xs]}
      px={[space.xxs]}
      gridTemplateColumns="repeat(3, 1fr)"
      gridTemplateRows="1fr 1fr"
      gridGap={[space.xxs]}
      overflowY="scroll"
    >
      {host && <SpeakerItem isHost photo={host.photo} name={host.name} />}
      {renderRemoteUsers()}
    </Grid>
  );
};

export default SpeakersList;
