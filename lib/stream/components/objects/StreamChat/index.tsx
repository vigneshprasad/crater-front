import { useMemo, useRef, useState } from "react";
import NewWindow from "react-new-window";
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
  IconButton,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { Checkbox } from "@/common/components/atoms/Checkbox";
import { PageRoutes } from "@/common/constants/route.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { Webinar } from "@/community/types/community";
import useChatColorMode from "@/stream/providers/ChatColorModeProvider";
import { FirebaseChatProvider } from "@/stream/providers/FirebaseChatProvider";
import { FirebaseChatContext } from "@/stream/providers/FirebaseChatProvider/context";
import useRewardsList from "@/tokens/context/RewardsListContext";

import ChatMessagesList from "../ChatMessagesList";

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
  const { user, profile, permission } = useAuth();
  const { rewards } = useRewardsList();
  const { space, borders, gradients, radii, colors } = useTheme();
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
              h="100%"
              gridTemplateRows={
                hasActiveReward
                  ? ["1fr max-content", "max-content 1fr max-content"]
                  : ["1fr max-content", "1fr max-content"]
              }
              borderTop={[`2px solid ${borders.main}`, "none"]}
              borderLeft={`2px solid ${borders.main}`}
              bg={colors.black[5]}
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
                  display="grid"
                  mx={space.xxxs}
                  my={space.xxxs}
                  gridAutoFlow="row"
                  gridGap={space.xxs}
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
                    placeholder="Ask a Question"
                    value={fields.message.value}
                    onChange={(e) =>
                      fieldValueSetter("message", e.currentTarget.value)
                    }
                    placeholderColor={
                      colorMode === "dark" ? undefined : "#969696"
                    }
                    color={colorMode === "dark" ? undefined : colors.black[0]}
                  />
                  <Flex
                    justifyContent={
                      user?.pk === stream.host ? "space-between" : "flex-end"
                    }
                    flexDirection="row"
                  >
                    <Flex
                      justifySelf="flex-start"
                      alignItems="center"
                      gridGap={space.xxxxs}
                    >
                      {showPopup && (
                        <IconButton
                          icon="PopOut"
                          onClick={openChatPopOut}
                          color={colors.white[0]}
                        />
                      )}

                      {user?.pk === stream.host && (
                        <Checkbox
                          checked={colorMode === "dark"}
                          labelProps={{
                            color:
                              colorMode === "light"
                                ? colors.black[0]
                                : undefined,
                            textStyle: "button",
                          }}
                          onClick={() => toggleColorMode()}
                        >
                          Dark Mode
                        </Checkbox>
                      )}
                    </Flex>

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

                      return null;
                    })()}

                    <Button
                      type="submit"
                      variant="nav-button"
                      px={space.xxxs}
                      text="Ask"
                      textProps={{
                        color: colorMode === "dark" ? undefined : "#fff",
                      }}
                    />
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
