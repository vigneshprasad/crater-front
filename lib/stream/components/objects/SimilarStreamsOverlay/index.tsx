import { Variants, useAnimation } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Text,
  Flex,
  Icon,
  AnimatedBox,
  Grid,
  Box,
  BottomSheet,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import WebinarApiClient from "@/community/api";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import {
  StreamsToRsvpProvider,
  StreamsToRsvpContext,
} from "@/stream/context/StreamsToRsvpContext";

import AnimatedCard from "./AnimatedCard";
import MobileCard from "./MobileCard";

export default function SimilarStreamsOverlay(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const controller = useAnimation();
  const { space } = useTheme();
  const { user } = useAuth();

  const scrollForward = useCallback(() => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scroll(width, 0);
    }
  }, [scrollContainerRef]);

  const scrollBackward = useCallback(() => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scroll(-width, 0);
    }
  }, [scrollContainerRef]);

  const animConfig: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
      transition: {
        when: "afterChildren",
      },
    },
    opened: {
      display: "block",
      height: 272,
      opacity: 1,
    },
  };

  const cardAnim: Variants = {
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    opened: {
      display: "flex",
      opacity: 1,
    },
  };

  return (
    <StreamsToRsvpProvider>
      <StreamsToRsvpContext.Consumer>
        {({ streams, mutateStreamsToRsvpPage }) => {
          const postRsvp = async (stream: Webinar): Promise<void> => {
            const data: PostGroupRequest = {
              group: stream.id,
              status: RequestStatus.accepted,
              participant_type:
                stream.host === user?.pk
                  ? ParticpantType.speaker
                  : ParticpantType.attendee,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, err] = await WebinarApiClient().postWebinarRequest(data);
            if (err) {
              console.log(err);
            }
            mutateStreamsToRsvpPage();
          };
          return (
            <>
              <BottomSheet
                rootBoxProps={{ display: ["grid", "none"] }}
                visible={opened}
                heading="Similar Streams"
                overflowY="auto"
                onClose={() => {
                  controller.start("closed");
                  setOpened(false);
                }}
              >
                <Grid
                  gridAutoFlow="rows"
                  gridAutoRows="max-content"
                  gridGap={space.xxxs}
                >
                  {streams &&
                    streams.map((stream) => (
                      <MobileCard
                        stream={stream}
                        key={stream.id}
                        onClick={postRsvp}
                      />
                    ))}
                </Grid>
              </BottomSheet>
              {opened && (
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  left={0}
                  bottom={0}
                  bg="transparent"
                  onClick={() => {
                    controller.start("closed");
                    setOpened(false);
                  }}
                />
              )}
              <AnimatedBox
                animate={controller}
                initial="closed"
                variants={animConfig}
                bg="rgba(0,0,0,0.7)"
                position="absolute"
                bottom={70}
                left={0}
                right={0}
              >
                <Grid
                  px={space.xxxs}
                  py={space.xxxs}
                  gridTemplateRows="max-content 1fr"
                  gridGap={space.xxxs}
                >
                  <Flex justifyContent="space-between">
                    <Flex alignItems="center">
                      <Text fontWeight="500" textStyle="body">
                        Similar Streams
                      </Text>

                      <Box>
                        <IconButton
                          icon="Close"
                          onClick={() => {
                            controller.start("closed");
                            setOpened(false);
                          }}
                        />
                      </Box>
                    </Flex>

                    <Flex gridGap={space.xxxs}>
                      <IconButton icon="ChevronLeft" onClick={scrollBackward} />
                      <IconButton icon="ChevronRight" onClick={scrollForward} />
                    </Flex>
                  </Flex>

                  {streams && (
                    <Grid
                      scrollBehavior="smooth"
                      gridGap={space.xxxs}
                      gridAutoFlow="column"
                      gridAutoColumns="220px"
                      overflowX="auto"
                      ref={scrollContainerRef}
                    >
                      {streams.map((stream) => {
                        return (
                          <AnimatedCard
                            variants={cardAnim}
                            key={stream.id}
                            stream={stream}
                            onClickCard={postRsvp}
                          />
                        );
                      })}
                    </Grid>
                  )}
                </Grid>
              </AnimatedBox>
              {streams && (
                <>
                  <Button
                    display={["none", "block"]}
                    variant="transparent"
                    position="absolute"
                    bottom={16}
                    right={16}
                  >
                    <Flex
                      gridGap={space.xxxxs}
                      onClick={() => {
                        setOpened((val) => {
                          controller.start(!val ? "opened" : "closed");
                          return !val;
                        });
                      }}
                    >
                      <Text fontSize="inherit" fontWeight="inherit">
                        Similar Streams
                      </Text>
                      <Icon icon="ChevronDown" rotate={opened ? 0 : 180} />
                    </Flex>
                  </Button>

                  {/* <IconButton
                    position="absolute"
                    left={16}
                    bottom={16}
                    buttonStyle="flat-accent"
                    display={["block", "none"]}
                    icon="ChevronDown"
                    iconProps={{ rotate: opened ? 0 : 180 }}
                    onClick={() => {
                      setOpened((val) => {
                        controller.start(!val ? "opened" : "closed");
                        return !val;
                      });
                    }}
                  /> */}
                </>
              )}
            </>
          );
        }}
      </StreamsToRsvpContext.Consumer>
    </StreamsToRsvpProvider>
  );
}
