import { useCallback } from "react";
import { useTheme } from "styled-components";

import { Flex, Text } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";

interface IProps {
  url: string;
}

export default function UrlShare({ url }: IProps): JSX.Element {
  const { space, radii, colors, borders } = useTheme();

  const performCopyClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(url);
  }, [url]);

  return (
    <Flex
      alignItems="center"
      px={space.xs}
      py={space.xxs}
      bg={colors.black[2]}
      borderRadius={radii.xxs}
      border={`2px solid ${borders.main}`}
    >
      <Text maxLines={1} flex="1">
        {url}
      </Text>
      <IconButton
        iconProps={{ fill: true }}
        icon="ContentCopy"
        onClick={performCopyClipboard}
      />
    </Flex>
  );
}
