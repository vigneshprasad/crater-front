import CRATER_LOGO from "public/images/crater_logo.png";
import { useState } from "react";
import { useTheme } from "styled-components";

import {
  Grid,
  Text,
  Modal,
  Avatar,
  Box,
  Image,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import { Webinar } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import useStreamCreator from "@/stream/context/StreamCreatorContext";

interface IProps {
  group: Webinar;
  visble: boolean;
  onClose: () => void;
}

export default function RsvpSuccesModal({
  visble,
  group,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const hostName = group.host_detail?.name;
  const [subscribe, setSubscribe] = useState({});
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { streams, loading: streamCreatorLoading } = useStreamCreator();

  if (!followers || followersLoading || streamCreatorLoading)
    return <Spinner />;

  const text = `
    We will notify you prior to the stream with ${hostName}.
    You can also follow other creators to get notified when they are live on Crater.
  `;

  return (
    <Modal
      display="grid"
      gridTemplateRows="max-content max-content 1fr max-content"
      maxWidth={600}
      visible={visble}
      onClose={onClose}
      overflowY="hidden"
      px={space.xs}
      py={space.xxs}
    >
      <Box w={100} justifySelf="center" alignSelf="center">
        <Image src={CRATER_LOGO} alt="Crater Logo" objectFit="cover" />
      </Box>

      <Box py={space.xxs}>
        <Text textStyle="headline5">Don&apos;t miss out!</Text>
        <Text my={space.xxs} color={colors.white[1]}>
          {text}
        </Text>

        <Text px={space.xxs} textStyle="headline6">
          Discover creators
        </Text>
      </Box>

      <Box px={space.xxs} overflowY="scroll">
        {streams &&
          streams?.map((stream) => (
            <Grid
              mb={space.xxs}
              gridAutoFlow="column"
              gridGap={space.xxs}
              gridTemplateColumns="min-content 1fr min-content"
              alignItems="center"
              justifyItems="center"
              key={stream.id}
            >
              <Avatar size={56} alt="host" />
              <Box justifySelf="start">
                <Text textStyle="bodyLarge">{stream.host_detail.name}</Text>
                <Text maxLines={2} color={colors.slate}>
                  {stream.is_live ? "Live Now: " : "Upcoming: "}
                  {stream.topic_detail.name}
                </Text>
              </Box>
              {!subscribe.hasOwnProperty(stream.id) ? (
                <Button
                  text="Follow"
                  variant="round-secondary"
                  border="1px solid white"
                  bg={colors.black[5]}
                  borderRadius={50}
                  justifySelf="end"
                  textProps={{ minWidth: 38, px: 0 }}
                  onClick={() => {
                    const creator = stream.host_detail?.creator_detail?.id;
                    if (creator) {
                      subscribeCreator(creator);
                      setSubscribe((prevSubscriber) => ({
                        ...prevSubscriber,
                        [stream.id]: true,
                      }));
                    }
                  }}
                />
              ) : (
                <Button
                  text="Followed"
                  variant="round-secondary"
                  color="black.2"
                  bg={colors.white[1]}
                  borderRadius={50}
                  justifySelf="end"
                  textProps={{ minWidth: 38, px: 0 }}
                  disabled={true}
                />
              )}
            </Grid>
          ))}
      </Box>

      <Button
        text="Done"
        variant="round"
        my={space.xxs}
        justifySelf="center"
        onClick={onClose}
      />
    </Modal>
  );
}
