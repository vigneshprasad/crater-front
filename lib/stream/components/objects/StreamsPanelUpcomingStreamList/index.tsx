import { forwardRef } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Icon, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import WebinarApiClient from "@/community/api";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import StreamsPanelUpcomingStreamCard from "../StreamsPanelUpcomingStreamCard";

const StreamsPanelUpcomingStreamList = forwardRef<HTMLDivElement>((_, ref) => {
  const { space } = useTheme();
  const { user } = useAuth();
  const {
    upcoming: streams,
    loading,
    nextPage,
    setUpcomingStreamsPage,
    mutateUpcomingStreams,
  } = useUpcomingStreams();

  const postStreamRsvp = async (stream: Webinar): Promise<void> => {
    if (user) {
      const data: PostGroupRequest = {
        group: stream.id,
        status: RequestStatus.accepted,
        participant_type:
          stream.host === user.pk
            ? ParticpantType.speaker
            : ParticpantType.attendee,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, err] = await WebinarApiClient().postWebinarRequest(data);
      if (err) {
        console.log(err);
      }
      await mutateUpcomingStreams();
    }
  };

  return (
    <Box pb={[space.xxxs, 0]} ref={ref}>
      {loading ? (
        Array(5)
          .fill("")
          .map((_, index) => (
            <Flex
              pb={space.xxxs}
              flexDirection="row"
              gridTemplateColumns="max-content 1fr"
              gridGap={space.xxxs}
              key={index}
            >
              <Shimmer w="100%" h={100} />

              <Box w="100%">
                <Shimmer h={36} />
                <Shimmer mt={space.xs} w={50} h={15} />
                <Shimmer mt={space.xxxxs} w="85%" h={18} />
              </Box>
            </Flex>
          ))
      ) : (
        <>
          {streams?.map((stream) => {
            return (
              <Box pb={space.xxs} key={stream.id}>
                <StreamsPanelUpcomingStreamCard
                  stream={stream}
                  onClickRsvp={postStreamRsvp}
                />
              </Box>
            );
          })}

          {nextPage && (
            <Button
              variant="dark-flat"
              h={40}
              w="100%"
              label="Load More"
              textProps={{ textStyle: "body", fontWeight: 500 }}
              display={["none", "flex"]}
              justifyContent="center"
              alignItems="center"
              gridGap={space.xxxs}
              suffixElement={<Icon icon="ChevronDown" size={20} />}
              onClick={() => setUpcomingStreamsPage((page) => page + 1)}
            />
          )}
        </>
      )}
    </Box>
  );
});

StreamsPanelUpcomingStreamList.displayName = "StreamsPanelUpcomingStreamList";

export default StreamsPanelUpcomingStreamList;
