import { useRef, useEffect, SyntheticEvent } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Input,
  Grid,
  Text,
  Flex,
  Span,
  Form,
  GridProps,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import ChatReactionList from "@/community/components/objects/ChatReactionList";
import { Webinar } from "@/community/types/community";
import useStreamChat from "@/stream/hooks/useStreamChat";
import { ChatMessageType } from "@/stream/types/streamChat";

import ChatRules from "../ChatRules";

interface IProps extends GridProps {
  stream: Webinar;
}

interface ChatFormProps {
  message: string;
  display_name?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StreamChat({ stream, ...rest }: IProps): JSX.Element {
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
              message: "Enter a question to ask.",
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
    <Grid
      h={["60vh", "auto"]}
      bg={colors.black[4]}
      gridTemplateRows={[
        "1fr min-content min-content",
        "min-content min-content 1fr min-content min-content",
      ]}
      borderLeft={`2px solid ${borders.main}`}
      {...rest}
    >
      <Grid
        display={["none", "grid"]}
        py={space.xxs}
        px={space.xxs}
        gridTemplateColumns="1fr min-content"
        alignItems="center"
      >
        <Text textStyle="title">Question Board</Text>

        <Flex
          justifyContent="space-between"
          borderBottom={`1px solid ${borders.main}`}
        >
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
      </Grid>

      <ChatRules />

      <Box
        ref={messagesContainerRef}
        borderBottom={`1px solid ${borders.main}`}
        py={space.xxxs}
        flexDirection="column-reverse"
        overflowY="auto"
      >
        {[...messages]
          .filter((obj) => obj.type === ChatMessageType.TEXT)
          .reverse()
          .map((message) => {
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

      <ChatReactionList />
      <Form
        display="grid"
        mx={space.xxxs}
        my={space.xxxs}
        gridAutoFlow="row"
        gridGap={space.xxs}
        onSubmit={handleChatSubmit}
      >
        <Input
          placeholder="Ask a Question"
          value={fields.message.value}
          onChange={(e) => fieldValueSetter("message", e.currentTarget.value)}
        />
        <Flex justifyContent="flex-end" flexDirection="row">
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
          <Button
            type="submit"
            variant="nav-button"
            px={space.xxxs}
            text="Ask"
          />
        </Flex>
      </Form>
    </Grid>
  );
}
