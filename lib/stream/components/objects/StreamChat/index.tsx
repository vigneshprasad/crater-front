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
  Shimmer,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { LEARN_MORE_URL } from "@/common/constants/url.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";
import { ConnectionStates } from "@/stream/providers/FirebaseChatProvider/context";
import { ChatMessageType } from "@/stream/types/streamChat";
import useAuctionsList from "@/tokens/context/AuctionListContext";

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
  const { profile } = useAuth();
  const { auctions, loading: auctionLoading } = useAuctionsList();

  const { messages, readyState, postMessage } = useFirebaseChat();
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
      messagesContainerRef.current.children[
        messagesContainerRef.current.children.length - 1
      ].scrollIntoView();
    }
  }, [messages, messagesContainerRef]);

  const handleChatSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();
    if (data) {
      postMessage({ message: data.message, display_name: data.display_name });
      fieldValueSetter("message", "");
    }
  };

  return (
    <Grid
      h={["60vh", "auto"]}
      bg={colors.black[6]}
      gridTemplateRows={[
        "min-content 1fr min-content",
        "min-content min-content 1fr min-content min-content",
      ]}
      borderTop={[`2px solid ${borders.main}`, "none"]}
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
              {readyState === ConnectionStates.CONNECTED
                ? "Connected"
                : "Connecting"}
            </Text>
            <Box
              mx={space.xxxs}
              w={8}
              h={8}
              borderRadius="50%"
              bg={
                readyState === ConnectionStates.CONNECTED
                  ? colors.greenSuccess
                  : colors.amber
              }
            />
          </Flex>
        </Flex>
      </Grid>

      {auctionLoading || !auctions ? (
        <Shimmer h={64} />
      ) : auctions.length > 0 ? (
        <Box pt={space.xxs} pb={space.xxxs} bg={colors.black[5]}>
          <Text textAlign="center" fontSize="1.6rem">
            Auction starts in:{" "}
            <Span fontWeight="600">
              {DateTime.parse(auctions[0].start)
                .diffNow()
                .toFormat("d'd' h'h' m'm'")}
            </Span>
          </Text>

          {/* <Button
            variant="small"
            m={`${space.xxxs}px auto`}
            text="Place a bid"
          /> */}

          <Box
            as="a"
            textAlign="center"
            href={LEARN_MORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Text textStyle="button" color={colors.accent}>
              Learn More
            </Text>
          </Box>
        </Box>
      ) : (
        <Box pt={space.xxs} pb={space.xxxs} bg={colors.black[5]}>
          <Text textAlign="center">
            Creator has not launched an auction yet
          </Text>

          <Button
            disabled
            variant="small"
            m={`${space.xxxs}px auto`}
            text="Place a bid"
          />
        </Box>
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
          {[...messages]
            .filter((obj) => obj.type === ChatMessageType.TEXT)
            .reverse()
            .map((message) => (
              <ChatMessageItem message={message} key={message.sender} />
            ))}
        </Box>
      </Box>

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
