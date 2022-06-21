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
import { Webinar } from "@/community/types/community";
import useChatColorMode from "@/stream/providers/ChatColorModeProvider";
import { FirebaseChatProvider } from "@/stream/providers/FirebaseChatProvider";
import { FirebaseChatContext } from "@/stream/providers/FirebaseChatProvider/context";
import useRewardsList from "@/tokens/context/RewardsListContext";

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
  const { profile, permission: apiPermission } = useAuth();
  const { permission: socketPermission } = useSystemSocket();
  const { rewards } = useRewardsList();
  const { space, gradients, radii, colors } = useTheme();
  const { colorMode, toggleColorMode } = useChatColorMode();
  const [popOutVisible, setPopOutVisible] = useState(false);
  const windowRef = useRef<NewWindow>(null);

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
        {({ messages, postMessage }) => {
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
                  />
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

                        if (isAdmin) {
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
