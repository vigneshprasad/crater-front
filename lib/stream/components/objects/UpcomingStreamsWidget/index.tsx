import { useAnimation } from "framer-motion";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBox,
  Box,
  Flex,
  Icon,
  Text,
  IconButton,
  Button,
  Shimmer,
} from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
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
  const { matches } = useMediaQuery("(max-width: 420px)");
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
      {!matches && (
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
      )}

      {!matches && (
        <AnimatedBox
          initial="closed"
          animate={animationController}
          position="absolute"
          top={16}
          bottom={16}
          overflowY="auto"
          right={8}
          w={280}
          bg={colors.blackAlpha[1]}
          borderRadius={radii.xxs}
          p={space.xxxs}
          variants={{
            closed: {
              transform: "translate(420px, 0)",
              transitionEnd: {
                display: "none",
              },
            },
            opened: {
              display: "block",
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
          <Box py={space.xxs}>
            <StreamsToRsvpProvider>
              <StreamsToRsvpContext.Consumer>
                {({ streams, mutateStreamsToRsvpPage, loading }) => {
                  const handleClick = async (
                    stream: Webinar
                  ): Promise<void> => {
                    const data: PostGroupRequest = {
                      group: stream.id,
                      participant_type: ParticpantType.attendee,
                      status: RequestStatus.accepted,
                    };
                    await WebinarApiClient().postWebinarRequest(data);

                    mutateStreamsToRsvpPage();

                    animationController.start("closed");
                  };

                  if (loading) {
                    return Array(3)
                      .fill("")
                      .map((_, index) => <Shimmer key={index} pt="56.25%" />);
                  }

                  return streams?.map((stream) => (
                    <Box
                      key={stream.id}
                      flexDirection="column"
                      cursor="pointer"
                    >
                      <Box
                        position="relative"
                        pt="56.25%"
                        overflow="hidden"
                        borderRadius={radii.xxs}
                      >
                        {stream.topic_detail.image && (
                          <Image
                            src={stream.topic_detail.image}
                            alt={stream.topic_detail.name}
                            layout="fill"
                          />
                        )}
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
      )}
    </>
  );
}
