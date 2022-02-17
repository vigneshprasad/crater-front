import { useTheme } from "styled-components";

import { Text, Span } from "@/common/components/atoms";
import hashString from "@/common/utils/hash/hash";
import { ChatMessage } from "@/stream/providers/FirebaseChatProvider/types";

interface IProps {
  message: ChatMessage;
}

export default function ChatMessageItem({ message }: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const name = message.display_name
    ? message.display_name
    : message.sender_details && message.sender_details.name
    ? message.sender_details.name
    : "";

  const toHash = name + message.sender_details?.pk;

  return (
    <Text mx={space.xxs} key={message.message} wordBreak="break-word">
      <Span
        color={colors.chatColors[hashString(toHash) % colors.chatColors.length]}
      >
        {name}:
      </Span>{" "}
      {message.message}
    </Text>
  );
}
