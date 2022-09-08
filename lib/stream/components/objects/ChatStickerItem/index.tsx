import EMOJI_IMAGE_LIST from "public/images/emoji";
import { useMemo } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Image, Span } from "@/common/components/atoms";
import hashString from "@/common/utils/hash/hash";
import { ChatMessage } from "@/stream/providers/FirebaseChatProvider/types";

interface IProps {
  message: ChatMessage;
  textColor?: string;
}
export default function ChatStickerItem({
  message,
  textColor,
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
  const { user } = useAuth();

  const name = useMemo(() => {
    if (message.display_name) {
      return message.display_name;
    }

    if (message.sender_details?.first_name) {
      return message.sender_details?.first_name;
    }

    return message.sender_details?.name ?? "";
  }, [message]);

  const toHash = name + message.sender_details?.pk;

  return (
    <Box
      py={2}
      px={space.xxxxs}
      bg={colors.primaryLight}
      textStyle="chatText"
      mx={space.xxxs}
      key={message.message}
      wordBreak="break-word"
      color={textColor}
      borderRadius={radii.xxxs}
    >
      <Span
        fontWeight="600"
        color={
          message.sender === user?.pk
            ? colors.chatPrimaryColor
            : colors.chatColors[hashString(toHash) % colors.chatColors.length]
        }
      >
        {name}:
      </Span>
      <Box w={96} h={96} position="relative">
        {message.data?.sticker && (
          <Image
            src={EMOJI_IMAGE_LIST[message.data?.sticker]}
            alt={message.data?.sticker}
            layout="fill"
            objectFit="contain"
          />
        )}
      </Box>
    </Box>
  );
}
