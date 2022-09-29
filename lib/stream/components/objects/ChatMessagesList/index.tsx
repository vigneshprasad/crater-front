import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "styled-components";

import { Box, Flex } from "@/common/components/atoms";
import {
  ChatMessage,
  ChatMessageType,
} from "@/stream/providers/FirebaseChatProvider/types";

import ChatMessageItem from "../ChatMessageItem";
import ChatStickerItem from "../ChatStickerItem";

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

  const observerHandler = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo(0, 0);
    }
  }, [messagesContainerRef]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const observer = new MutationObserver(observerHandler);

      observer.observe(messagesContainerRef.current, {
        childList: true,
      });
    }
  }, [messagesContainerRef, observerHandler]);

  return (
    <Box position="relative" borderBottom={`1px solid ${borders.main}`}>
      <Flex
        scrollBehavior="smooth"
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        ref={messagesContainerRef}
        py={space.xxxs}
        gridGap={space.xxxxs}
        flexDirection="column-reverse"
        alignItems="flex-start"
        overflowY="auto"
      >
        {[...messages].map((message) => {
          const messageType = parseInt(message.type.toString());
          if (messageType === ChatMessageType.TEXT) {
            return (
              <ChatMessageItem
                message={message}
                key={message.created_at.seconds}
                textColor={colorMode === "light" ? colors.black[0] : undefined}
              />
            );
          } else if (messageType === ChatMessageType.STICKER) {
            return (
              <ChatStickerItem
                message={message}
                textColor={colorMode === "light" ? colors.black[0] : undefined}
              />
            );
          }
        })}
      </Flex>
    </Box>
  );
}
