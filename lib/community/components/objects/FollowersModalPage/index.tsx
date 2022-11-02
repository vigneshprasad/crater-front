import { AnyObject } from "immer/dist/internal";
import { Dispatch, forwardRef } from "react";
import styled, { useTheme } from "styled-components";

import {
  Box,
  Text,
  Grid,
  Avatar,
  Button,
  Shimmer,
} from "@/common/components/atoms";
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
  subscribe: AnyObject;
  setSubscribe: Dispatch<AnyObject>;
  subscribeCreator: (creator: number) => void;
}

const FollowersModalPage = forwardRef<HTMLDivElement, IProps>(
  (
    {
      currentStream,
      streams,
      loading,
      subscribe,
      setSubscribe,
      subscribeCreator,
    },
    ref
  ) => {
    const { space, colors, radii } = useTheme();

    const text = `
    We will notify you prior to the stream with ${currentStream?.host_detail.name}.
    You can also follow other creators to get notified when they are live on Crater.
  `;

    return (
      <>
        <Box pt={space.xxs}>
          <Text textStyle="headline5">Don&apos;t miss out!</Text>
          <Text my={space.xxs} color={colors.white[1]}>
            {currentStream
              ? text
              : "Follow creators to get notified when they are live on Crater."}
          </Text>

          <Text textStyle="headline6">Discover creators</Text>
        </Box>

        <StyledBox overflowY="auto">
          {loading
            ? Array(3)
                .fill("")
                .map((_, index) => (
                  <Shimmer
                    w="100%"
                    h={55}
                    mb={space.xxs}
                    borderRadius={radii.xxs}
                    key={index}
                  />
                ))
            : streams?.map((stream, index) => {
                if (currentStream && stream.id === currentStream.id) return;

                return (
                  <Grid
                    mb={space.xxs}
                    gridGap={space.xxs}
                    gridTemplateColumns="max-content 1fr max-content"
                    alignItems="center"
                    key={stream.id}
                    ref={index == streams.length - 1 ? ref : null}
                  >
                    <Avatar
                      image={stream.host_detail?.photo}
                      size={56}
                      alt={stream.host_detail?.name || ""}
                    />
                    <Box justifySelf="start">
                      <Text textStyle="bodyLarge">
                        {stream.host_detail.name}
                      </Text>
                      <Text display={["none", "grid"]} color={colors.slate}>
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
                        onClick={() => {
                          const creator =
                            stream.host_detail?.creator_detail?.id;
                          if (creator) {
                            subscribeCreator(creator);
                            setSubscribe((prevSubscriber: AnyObject) => ({
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
                        disabled={true}
                      />
                    )}
                    <Text
                      display={["grid", "none"]}
                      gridColumn="1 / span 3"
                      color={colors.slate}
                    >
                      {stream.is_live ? "Live Now: " : "Upcoming: "}
                      {stream.topic_detail.name}
                    </Text>
                  </Grid>
                );
              })}
        </StyledBox>
      </>
    );
  }
);

FollowersModalPage.displayName = "FollowersModalPage";

FollowersModalPage.defaultProps = {
  streams: undefined,
};

export default FollowersModalPage;
