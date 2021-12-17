import { useTheme } from "styled-components";

import { Avatar, Box, Grid } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import useChatReactionList from "@/community/context/ChatReactionListContext";
import useStreamChat from "@/stream/hooks/useStreamChat";

export default function ChatReactionList(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { reactions, loading: loading } = useChatReactionList();
  const { sendChatReaction } = useStreamChat();

  return (
    <Box
      m={space.xxxs}
      bg={colors.black[3]}
      borderRadius={radii.xxs}
      overflowY="auto"
      maxHeight={["72px", "112px"]}
    >
      <Grid
        borderRadius={`${radii.xxs}px`}
        gridTemplateColumns="repeat(auto-fill, minmax(36px, 1fr))"
        gridGap={space.xxxs}
        p={space.xxs}
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
              cursor="pointer"
              title={reaction.name}
              key={reaction.id}
              size={36}
              image={reaction.image}
              onClick={() => {
                sendChatReaction(reaction.id);
              }}
            />
          ));
        })()}
      </Grid>
    </Box>
  );
}
