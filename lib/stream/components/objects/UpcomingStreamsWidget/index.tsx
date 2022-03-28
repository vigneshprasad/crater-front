import { useAnimation } from "framer-motion";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Icon, AnimatedBox, Flex, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import IconButton from "@/common/components/atoms/IconButton";
import WebinarApiClient from "@/community/api";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import {
  StreamsToRsvpContext,
  StreamsToRsvpProvider,
} from "@/stream/context/StreamsToRsvpContext";

export default function UpcomingStreamsWidget(): JSX.Element {
  const { colors, space, radii } = useTheme();
  const animationController = useAnimation();

  const handleOpenPanel = (): void => {
    animationController.start("opened");
  };

  const handleClosePanel = (): void => {
    animationController.start("closed");
  };

  return (
    <>
      <AnimatedBox
        animate={animationController}
        onClick={handleOpenPanel}
        cursor="pointer"
        alignItems="center"
        position="absolute"
        initial="closed"
        top="50%"
        right={16}
        variants={{
          closed: {
            display: "flex",
            transform: "translate(0, 0)",
          },
          opened: {
            transform: "translate(120px, 0)",
            transitionEnd: {
              display: "none",
            },
          },
        }}
      >
        <Icon icon="ArrowLeft" fill color={colors.accent} />
        <Box
          border={`2px solid ${colors.accent}`}
          p={space.xxxxs}
          borderRadius={radii.xxs}
        >
          <Icon icon="ViewStream" color={colors.white[0]} fill />
        </Box>
      </AnimatedBox>

      <AnimatedBox
        initial="closed"
        animate={animationController}
        position="absolute"
        top={16}
        bottom={16}
        right={8}
        w={280}
        bg={colors.blackAlpha[1]}
        borderRadius={radii.xxs}
        p={space.xxxs}
        variants={{
          closed: {
            transform: "translate(420px, 0)",
          },
          opened: {
            transform: "translate(0px, 0)",
          },
        }}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontWeight="700">Upcoming Streams</Text>
          </Box>
          <IconButton
            variant="roundSmall"
            icon="Close"
            onClick={handleClosePanel}
          />
        </Flex>
        <Box overflowY="auto" py={space.xxs}>
          <StreamsToRsvpProvider>
            <StreamsToRsvpContext.Consumer>
              {({ streams, mutateStreamsToRsvpPage }) => {
                const handleClick = async (stream: Webinar): Promise<void> => {
                  const data: PostGroupRequest = {
                    group: stream.id,
                    participant_type: ParticpantType.attendee,
                    status: RequestStatus.accepted,
                  };
                  await WebinarApiClient().postWebinarRequest(data);

                  mutateStreamsToRsvpPage();

                  animationController.start("closed");
                };

                return streams?.map((stream) => (
                  <Box key={stream.id} flexDirection="column" cursor="pointer">
                    <Box
                      position="relative"
                      pt="56.25%"
                      overflow="hidden"
                      borderRadius={radii.xxs}
                    >
                      <Image
                        src={stream.topic_detail.image}
                        alt={stream.topic_detail.name}
                        layout="fill"
                      />
                    </Box>
                    <Button
                      m="12px auto"
                      bg="transparent"
                      variant="round"
                      text="RSVP"
                      onClick={() => handleClick(stream)}
                    />
                  </Box>
                ));
              }}
            </StreamsToRsvpContext.Consumer>
          </StreamsToRsvpProvider>
        </Box>
      </AnimatedBox>
    </>
  );
}
