import { useRef, useEffect, SyntheticEvent } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Input,
  Card,
  Text,
  Flex,
  Span,
  Form,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { Webinar } from "@/community/types/community";
import useStreamChat from "@/stream/hooks/useStreamChat";

interface IProps {
  stream: Webinar;
}

interface ChatFormProps {
  message: string;
  display_name?: string;
}

export default function StreamChat({}: IProps): JSX.Element {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { profile } = useAuth();

  const { messages, sendGroupMessage, connected } = useStreamChat();
  const { space, colors, borders } = useTheme();
  const { fields, fieldValueSetter, getValidatedData } = useForm<ChatFormProps>(
    {
      fields: {
        message: {
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Enter a message to send.",
            },
          ],
        },
        display_name: {
          intialValue: "",
          validators: [],
        },
      },
    }
  );

  useEffect(() => {
    if (messages.length && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, messagesContainerRef]);

  const handleChatSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();
    if (data) {
      sendGroupMessage(data.message, data.display_name);
      fieldValueSetter("message", "");
    }
  };

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
        h: "fill-available",
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
        {[...messages].reverse().map((message) => {
          const name = message.display_name
            ? message.display_name
            : message.sender_detail.first_name;
          return (
            <Text mx={space.xxs} key={message.id} wordBreak="break-word">
              <Span color={colors.accent}>{name}:</Span> {message.message}
            </Text>
          );
        })}
      </Box>
      <Form
        display="grid"
        mx={space.xxxs}
        my={space.xxxs}
        gridTemplateColumns="1fr min-content"
        gridGap={space.xxxs}
        onSubmit={handleChatSubmit}
      >
        <Input
          placeholder="Send a message"
          value={fields.message.value}
          onChange={(e) => fieldValueSetter("message", e.currentTarget.value)}
        />
        <Button type="submit" variant="dense" px={space.xxxs} text="Send" />
        {(() => {
          if (!profile) return null;

          const isAdmin = profile.groups.filter(
            (group) => group.name === "livestream_chat_admin"
          )[0]
            ? true
            : false;

          if (isAdmin) {
            return (
              <Input
                value={fields.display_name.value}
                onChange={(e) =>
                  fieldValueSetter("display_name", e.currentTarget.value)
                }
                placeholder="Display Name"
              />
            );
          }

          return null;
        })()}
      </Form>
    </Card>
  );
}
