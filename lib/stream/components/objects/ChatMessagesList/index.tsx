import { useEffect, useRef } from "react";
import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import { useWebinar } from "@/community/context/WebinarContext";
import {
  ChatMessage,
  ChatMessageType,
} from "@/stream/providers/FirebaseChatProvider/types";

import ChatActionItem from "../ChatActionItem";
import ChatMessageItem from "../ChatMessageItem";

interface IProps {
  messages: ChatMessage[];
  colorMode: string;
}

export default function ChatMessagesList({
  messages,
  colorMode,
}: IProps): JSX.Element {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { borders, space, colors } = useTheme();
  const { webinar, mutateWebinar } = useWebinar();

  useEffect(() => {
    if (messages.length && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
      messagesContainerRef.current.children[
        messagesContainerRef.current.children.length - 1
      ].scrollIntoView();
    }
  }, [messages, messagesContainerRef]);

  return (
    <Box
      overflowY="auto"
      position="relative"
      borderBottom={`1px solid ${borders.main}`}
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        ref={messagesContainerRef}
        py={space.xxxs}
        flexDirection="column-reverse"
      >
        {[...messages].reverse().map((message) => {
          const messageType = parseInt(message.type.toString());
          if (messageType === ChatMessageType.TEXT) {
            return (
              <ChatMessageItem
                message={message}
                key={message.created_at.toString()}
                textColor={colorMode === "light" ? colors.black[0] : undefined}
              />
            );
          } else if (messageType === ChatMessageType.ACTION) {
            return (
              <ChatActionItem
                stream={webinar}
                mutateStream={mutateWebinar}
                message={message}
                key={message.created_at.toString()}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
}
