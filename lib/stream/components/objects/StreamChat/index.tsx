import { useRef, useEffect, SyntheticEvent, useMemo } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Input,
  Grid,
  Flex,
  Form,
  GridProps,
  Text,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { useWebinar } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";
import { ChatMessageType } from "@/stream/types/streamChat";
import useRewardsList from "@/tokens/context/RewardsListContext";

import ChatActionItem from "../ChatActionItem";
import ChatMessageItem from "../ChatMessageItem";

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
  const { profile, permission } = useAuth();
  const { rewards } = useRewardsList();
  const { messages, postMessage } = useFirebaseChat();
  const { space, borders, gradients, radii } = useTheme();
  const { webinar: cachedWebinar, mutateWebinar } = useWebinar();

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
      messagesContainerRef.current.children[
        messagesContainerRef.current.children.length - 1
      ].scrollIntoView();
    }
  }, [messages, messagesContainerRef]);

  const handleChatSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();
    if (data) {
      const message = {
        message: data?.message,
        display_name: data?.display_name,
      };

      if (!data.display_name) {
        delete message.display_name;
      }
      postMessage(message);
      fieldValueSetter("message", "");
    }
  };

  const hasActiveReward = useMemo(() => {
    if (!rewards) {
      return false;
    }
    return rewards.reduce((acc, curr) => {
      if (!acc) {
        if (curr.active_auction) {
          return true;
        }
      }
      return acc;
    }, false);
  }, [rewards]);

  return (
    <Grid
      gridTemplateRows={
        hasActiveReward
          ? ["1fr max-content", "max-content 1fr max-content"]
          : ["1fr max-content", "1fr max-content"]
      }
      borderTop={[`2px solid ${borders.main}`, "none"]}
      borderLeft={`2px solid ${borders.main}`}
      {...rest}
    >
      {hasActiveReward && (
        <Link
          href={PageRoutes.stream(stream.id, "auction")}
          boxProps={{
            display: ["none", "block"],
          }}
          shallow
        >
          <Box
            borderRadius={radii.xxs}
            p={space.xxxs}
            m={space.xxs}
            background={gradients.primary}
          >
            <Text mb={space.xxxxs} textStyle="title">
              {stream.host_detail.name}&apos;s auction is live now
            </Text>
            <Text>
              To get access to exclusive content, time, communities or goods you
              can place a bid at the auction.
            </Text>
          </Box>
        </Link>
      )}
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
                />
              );
            } else if (messageType === ChatMessageType.ACTION) {
              return (
                <ChatActionItem
                  stream={cachedWebinar}
                  mutateStream={mutateWebinar}
                  message={message}
                />
              );
            }
          })}
        </Box>
      </Box>

      {permission?.allow_chat && (
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
      )}
    </Grid>
  );
}
