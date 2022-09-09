import { useMemo, useRef, useState } from "react";
import NewWindow from "react-new-window";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useSystemSocket from "@/auth/context/SystemSocketContext";
import {
  Box,
  Input,
  Grid,
  Flex,
  Form,
  GridProps,
  Text,
  Link,
  Toggle,
  Icon,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { IconButton } from "@/common/components/atoms/v2";
import MenuButton from "@/common/components/objects/MenuButton";
import { MenuItem } from "@/common/components/objects/MenuButton/MenuItem";
import { PageRoutes } from "@/common/constants/route.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import DateTime from "@/common/utils/datetime/DateTime";
import { useWebinar } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import useChatColorMode from "@/stream/providers/ChatColorModeProvider";
import { FirebaseChatProvider } from "@/stream/providers/FirebaseChatProvider";
import { FirebaseChatContext } from "@/stream/providers/FirebaseChatProvider/context";
import {
  ChatMessage,
  ChatMessageType,
} from "@/stream/providers/FirebaseChatProvider/types";
import useRewardsList from "@/tokens/context/RewardsListContext";

import ChatActionItem from "../ChatActionItem";
import ChatEmojiSheet from "../ChatEmojiSheet";
import ChatMessagePrompt from "../ChatMessagePrompt";
import ChatMessagesList from "../ChatMessagesList";
import StreamViewerCount from "../StreamViewerCount";

interface IProps extends GridProps {
  stream: Webinar;
  showPopup?: boolean;
}

interface ChatFormProps {
  message: string;
  display_name?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StreamChat({
  stream,
  showPopup = true,
  ...rest
}: IProps): JSX.Element {
  const { profile, permission: apiPermission, user } = useAuth();
  const { permission: socketPermission } = useSystemSocket();
  const { rewards } = useRewardsList();
  const { space, gradients, radii, colors } = useTheme();
  const { colorMode, toggleColorMode } = useChatColorMode();
  const [popOutVisible, setPopOutVisible] = useState(false);
  const windowRef = useRef<NewWindow>(null);
  const { mutateWebinar } = useWebinar();
  const [showSheet, setShowSheet] = useState(false);

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

  const permission = useMemo(() => {
    if (socketPermission) return socketPermission;
    return apiPermission;
  }, [apiPermission, socketPermission]);

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

  const openChatPopOut = (): void => {
    setPopOutVisible(true);
  };

  if (popOutVisible) {
    return (
      <>
        <NewWindow
          ref={windowRef}
          url={`/livestream/${stream.id}/chat`}
          features={{ width: 420, height: 800 }}
          onUnload={() => {
            setPopOutVisible(false);
          }}
        />
        <Grid>
          <Box m="auto auto">
            <Text textAlign="center">Popout chat active</Text>
            <Button
              text="Show chat here"
              onClick={() => {
                setPopOutVisible(false);
                windowRef.current?.release();
              }}
            />
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <FirebaseChatProvider groupId={stream.id}>
      <FirebaseChatContext.Consumer>
        {({ messages: allMessages, postMessage, postSticker }) => {
          const messages = allMessages.filter(
            (val) =>
              val.type === ChatMessageType.TEXT || ChatMessageType.STICKER
          );

          const actions = allMessages.filter((val) => {
            const creation = DateTime.fromJSDate(val.created_at.toDate());
            const diff = DateTime.now().diff(creation, "seconds");

            return val.type === ChatMessageType.ACTION && diff.seconds < 30;
          });

          const prompts = allMessages.filter((val) => {
            const creation = DateTime.fromJSDate(val.created_at.toDate());
            const diff = DateTime.now().diff(creation, "seconds");

            return val.type === ChatMessageType.PROMPT && diff.seconds < 30;
          });
          return (
            <Grid
              minHeight="100%"
              gridTemplateRows={
                hasActiveReward
                  ? ["1fr max-content", "max-content 1fr max-content"]
                  : ["1fr max-content", "1fr max-content"]
              }
              bg={colors.primaryDark}
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
                      To get access to exclusive content, time, communities or
                      goods you can place a bid at the auction.
                    </Text>
                  </Box>
                </Link>
              )}
              <ChatMessagesList colorMode={colorMode} messages={messages} />

              {permission?.allow_chat && (
                <Form
                  position="relative"
                  bg={colors.primaryLight}
                  display="grid"
                  px={space.xxxs}
                  py={space.xxxs}
                  gridAutoFlow="row"
                  gridGap={space.xxxs}
                  onSubmit={(event) => {
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
                  }}
                >
                  {actions.map((action) => (
                    <ChatActionItem
                      stream={stream}
                      mutateStream={mutateWebinar}
                      message={action}
                      key={action.created_at.toString()}
                    />
                  ))}
                  <Box position="relative">
                    <Input
                      placeholder="Start chatting..."
                      value={fields.message.value}
                      onChange={(e) =>
                        fieldValueSetter("message", e.currentTarget.value)
                      }
                      placeholderColor={
                        colorMode === "dark" ? undefined : "#969696"
                      }
                      color={colorMode === "dark" ? undefined : colors.black[0]}
                      suffixElement={
                        <IconButton
                          icon="Emoji"
                          type="button"
                          buttonStyle="flat-icon"
                          onClick={() => {
                            setShowSheet((val) => !val);
                          }}
                        />
                      }
                    />
                    <ChatEmojiSheet
                      visible={showSheet}
                      onClose={() => {
                        setShowSheet(false);
                      }}
                      onClickItem={(item) => {
                        const data: Partial<ChatMessage> = {
                          display_name: fields.display_name.value,
                          data: {
                            sticker: item,
                          },
                        };
                        postSticker(data);
                        setShowSheet(false);
                      }}
                    />
                    {prompts.map((prompt) => (
                      <ChatMessagePrompt
                        key={prompt.group}
                        message={prompt.message}
                        onClick={(val) => fieldValueSetter("message", val)}
                      />
                    ))}
                  </Box>

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
                            fieldValueSetter(
                              "display_name",
                              e.currentTarget.value
                            )
                          }
                          placeholder="Display Name"
                        />
                      );
                    }
                  })()}
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box flex="1">
                      {(() => {
                        const isAdmin = profile?.groups.filter(
                          (group) => group.name === "livestream_chat_admin"
                        )[0]
                          ? true
                          : false;
                        const isSpeaker =
                          user?.pk === stream.host ||
                          (stream?.speakers &&
                            user &&
                            stream.speakers?.indexOf(user?.pk) > -1);
                        const showCount =
                          isAdmin ||
                          (permission.show_viewer_count && isSpeaker);
                        if (showCount) {
                          return <StreamViewerCount />;
                        }
                      })()}
                    </Box>

                    <Flex gridGap={space.xxxxs}>
                      <MenuButton
                        icon="Settings"
                        items={[
                          <MenuItem key="colorMode">
                            <Flex
                              w="max-content"
                              gridGap={space.xxxs}
                              alignItems="center"
                            >
                              <Text textStyle="tabLabel">Chat Theme</Text>
                              <Toggle
                                value={colorMode === "dark"}
                                onChange={() => {
                                  toggleColorMode();
                                }}
                              >
                                {colorMode === "dark" ? (
                                  <Icon m="auto auto" icon="Moon" size={8} />
                                ) : (
                                  <Icon m="auto auto" icon="Sun" size={8} />
                                )}
                              </Toggle>
                            </Flex>
                          </MenuItem>,
                          showPopup && (
                            <MenuItem
                              onClick={() => {
                                openChatPopOut();
                              }}
                              key="popout"
                              label="Popout Chat"
                              suffixElement={<Icon size={18} icon="PopOut" />}
                            />
                          ),
                        ]}
                      />
                      <IconButton
                        type="submit"
                        icon="Send"
                        iconProps={{ color: "white.0" }}
                        buttonStyle="flat-accent"
                      />
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Grid>
          );
        }}
      </FirebaseChatContext.Consumer>
    </FirebaseChatProvider>
  );
}
