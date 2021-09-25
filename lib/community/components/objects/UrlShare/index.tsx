import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Flex, Text } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";

export default function UrlShare(): JSX.Element {
  const [url, setUrl] = useState("");
  const { space, radii, colors, borders } = useTheme();

  const performCopyClipboard = useCallback(async () => {
    if (url) {
      await navigator.clipboard.writeText(url);
    }
  }, [url]);

  useEffect(() => {
    const location = window.location.href;
    const urlObj = new URL(location);

    setUrl(`${urlObj.origin}${urlObj.pathname}`);
  }, []);

  return (
    <Flex
      alignItems="center"
      px={space.xs}
      py={space.xxs}
      bg={colors.black[2]}
      borderRadius={radii.xxs}
      border={`2px solid ${borders.main}`}
    >
      <Text maxLines={1} flex="1" wordBreak="break-word">
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
