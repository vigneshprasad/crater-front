import { forwardRef } from "react";
import styled, { useTheme } from "styled-components";

import {
  Box,
  Text,
  Button,
  Grid,
  Image,
  Span,
  Shimmer,
  Avatar,
} from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

const StyledBox = styled(Box)`
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

interface IProps {
  currentStream?: Webinar;
  streams?: Webinar[];
  loading: boolean;
  rsvpedStreams: number[];
  postGroupRequest: (webinar: Webinar, redirect: boolean) => void;
}

const StreamsModalPage = forwardRef<HTMLDivElement, IProps>(
  (
    { currentStream, streams, loading, rsvpedStreams, postGroupRequest },
    ref
  ) => {
    const { space, colors, radii } = useTheme();

    return (
      <>
        <Box pt={space.xxs}>
          <Text textStyle="headline5">Live & Upcoming Streams</Text>
        </Box>

        <StyledBox overflowY="auto">
          <Grid
            gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
            gridColumnGap={space.xs}
            gridRowGap={space.xs}
          >
            {loading
              ? Array(4)
                  .fill("")
                  .map((_, index) => (
                    <Shimmer
                      w="100%"
                      h={250}
                      borderRadius={radii.xxs}
                      key={index}
                    />
                  ))
              : streams?.map((stream, index) => {
                  if (currentStream && stream.id === currentStream.id) return;

                  return (
                    <Grid
                      gridAutoFlow="row"
                      gridGap={space.xxs}
                      gridTemplateRows="max-content max-content max-content"
                      key={stream.id}
                      ref={index == streams.length - 1 ? ref : null}
                    >
                      <Grid
                        gridTemplateColumns="max-content 1fr"
                        gridGap={space.xxs}
                        alignItems="center"
                      >
                        <Avatar
                          size={36}
                          image={stream.host_detail?.photo}
                          alt={stream.host_detail?.name || ""}
                        />
                        <Text>{stream.host_detail.name}</Text>
                      </Grid>

                      <Box position="relative" h={["none", 150]}>
                        {stream.topic_detail?.image && (
                          <Image
                            objectFit="cover"
                            layout="fill"
                            src={stream.topic_detail?.image}
                            alt={stream.topic_detail.name}
                          />
                        )}

                        <Box
                          borderRadius={4}
                          py={2}
                          px={space.xxxs}
                          bg={stream.is_live ? colors.red[0] : colors.black[0]}
                          position="absolute"
                          top={space.xxxs}
                          left={space.xxxs}
                        >
                          <Text textStyle="caption">
                            {stream.is_live ? (
                              "LIVE"
                            ) : (
                              <>
                                <Span>Live On</Span>{" "}
                                {DateTime.parse(stream.start).toFormat(
                                  DateTime.DEFAULT_FORMAT
                                )}
                              </>
                            )}
                          </Text>
                        </Box>
                      </Box>

                      {stream.is_live ? (
                        <Button
                          text="Join Stream"
                          variant="round-secondary"
                          border="1px solid white"
                          bg={colors.black[5]}
                          borderRadius={50}
                          justifySelf="center"
                          alignSelf="end"
                          onClick={() => postGroupRequest(stream, true)}
                        />
                      ) : rsvpedStreams?.includes(stream.id) ? (
                        <Button
                          text="RSVP'd"
                          variant="round-secondary"
                          color="black.2"
                          bg={colors.white[1]}
                          borderRadius={50}
                          justifySelf="center"
                          alignSelf="end"
                          disabled={true}
                        />
                      ) : (
                        <Button
                          text="RSVP"
                          variant="round-secondary"
                          border="1px solid white"
                          bg={colors.black[5]}
                          borderRadius={50}
                          justifySelf="center"
                          alignSelf="end"
                          onClick={() => postGroupRequest(stream, false)}
                        />
                      )}
                    </Grid>
                  );
                })}
          </Grid>
        </StyledBox>
      </>
    );
  }
);

StreamsModalPage.displayName = "StreamsModalPage";

StreamsModalPage.defaultProps = {
  streams: undefined,
};

export default StreamsModalPage;
