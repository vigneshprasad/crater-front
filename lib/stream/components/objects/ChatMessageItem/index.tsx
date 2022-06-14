import linkifyHtml from "linkify-html";
import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Text, Span } from "@/common/components/atoms";
import hashString from "@/common/utils/hash/hash";
import { ChatMessage } from "@/stream/providers/FirebaseChatProvider/types";

interface IProps {
  message: ChatMessage;
  textColor?: string;
}

const LinkSpan = styled(Span)`
  & > a {
    color: ${({ theme }) => theme.colors.linkColor};
    text-decoration: underline;
  }
`;

const LinkifiedText = ({ text }: { text: string }): JSX.Element => {
  return <LinkSpan dangerouslySetInnerHTML={{ __html: text }} />;
};

export default function ChatMessageItem({
  message,
  textColor,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
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

  const text = useMemo(() => {
    const options = { defaultProtocol: "https", target: "__blank" };
    return linkifyHtml(message.message, options);
  }, [message]);

  const toHash = name + message.sender_details?.pk;

  return (
    <Text
      as="div"
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
      </Span>{" "}
      <LinkifiedText text={text} />
    </Text>
  );
}
