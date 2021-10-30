import { useRef, useState, useEffect } from "react";
import { useTheme } from "styled-components";

import { Box, Input, Card, Text, Flex, Grid } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { Webinar } from "@/community/types/community";
import useStreamChat from "@/stream/hooks/useStreamChat";

interface IProps {
  stream: Webinar;
}

export default function StreamChat({}: IProps): JSX.Element {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const { messages, sendGroupMessage, connected } = useStreamChat();
  const { space, colors, borders } = useTheme();

  const sendMessage = (): void => {
    if (text) {
      sendGroupMessage(text);
      setText("");
    }
  };

  useEffect(() => {
    if (messages.length && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, messagesContainerRef]);

  return (
    <Card
      position="relative"
      containerProps={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: "grid",
        gridTemplateRows: "max-content 1fr max-content",
        px: 0,
        py: 0,
      }}
    >
      <Flex p={space.xxs} justifyContent="space-between">
        <Text textStyle="title">Live Chat</Text>
        <Flex alignItems="center">
          <Text textStyle="small" color={colors.slate}>
            {connected ? "Connected" : "Connecting"}
          </Text>
          <Box
            mx={space.xxxs}
            w={8}
            h={8}
            borderRadius="50%"
            bg={connected ? colors.greenSuccess : colors.amber}
          />
        </Flex>
      </Flex>
      <Box
        ref={messagesContainerRef}
        borderTop={`1px solid ${borders.main}`}
        borderBottom={`1px solid ${borders.main}`}
        py={space.xxxs}
        flexDirection="column-reverse"
        overflowY="auto"
      >
        {[...messages].reverse().map((message) => (
          <Flex key={message.id} px={space.xxs}>
            <Text color={colors.accent}>{message.sender_detail.name}:</Text>
            <Text ml={space.xxxs}>{message.message}</Text>
          </Flex>
        ))}
      </Box>
      <Grid
        mx={space.xxxs}
        my={space.xxxs}
        gridTemplateColumns="1fr min-content"
        gridGap={space.xxxs}
      >
        <Input
          placeholder="Send a message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Button
          variant="dense"
          px={space.xxxs}
          text="Send"
          onClick={sendMessage}
        />
      </Grid>
    </Card>
  );
}
