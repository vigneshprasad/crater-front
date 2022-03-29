import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Flex, Text } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";

interface IProps {
  referrer?: string;
}

export default function UrlShare({ referrer }: IProps): JSX.Element {
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

    if (referrer) {
      setUrl(`${urlObj.origin}${urlObj.pathname}?referrer=${referrer}`);
    } else {
      setUrl(`${urlObj.origin}${urlObj.pathname}`);
    }
  }, [referrer]);

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
