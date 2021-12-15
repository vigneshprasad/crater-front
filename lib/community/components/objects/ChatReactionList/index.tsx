import { useTheme } from "styled-components";

import { Avatar, Box, Grid, Text } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import useChatReactionList from "@/community/context/ChatReactionListContext";
import useStreamChat from "@/stream/hooks/useStreamChat";

export default function ChatReactionList(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { reactions, loading: loading } = useChatReactionList();
  const { sendChatReaction } = useStreamChat();

  return (
    <>
      <Text px={space.xxs} textStyle="title">
        {`Chat Reactions`}
      </Text>
      <Grid
        borderRadius={`${radii.xxs}px`}
        gridAutoFlow="column"
        gridAutoRows="min-content"
        gridGap={space.xxxs}
        bg={colors.black[4]}
        p={space.xxs}
        maxHeight="40vh"
        h="100%"
        overflowY="auto"
      >
        {(() => {
          if (loading) {
            return (
              <Box m="auto auto">
                <Spinner />
              </Box>
            );
          }

          return reactions?.map((reaction) => (
            <Avatar
              key={reaction.id}
              size={32}
              image={reaction.image}
              onClick={() => {
                sendChatReaction(reaction.id);
              }}
            />
          ));
        })()}
      </Grid>
    </>
  );
}
