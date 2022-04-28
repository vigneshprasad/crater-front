import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Button, Flex, Text } from "@/common/components/atoms";

interface IProps {
  referrer?: string;
}

export default function UrlShare({ referrer }: IProps): JSX.Element {
  const [url, setUrl] = useState("");
  const { space, radii, colors, borders } = useTheme();
  const [btnText, setBtnText] = useState("Share now");

  const performCopyClipboard = useCallback(async () => {
    setBtnText("Copied");
    if (url) {
      await navigator.clipboard.writeText(url);
    }

    setTimeout(() => setBtnText("Share now"), 1000);
  }, [url]);

  useEffect(() => {
    const location = window.location.href;
    const urlObj = new URL(location);

    if (referrer) {
      setUrl(`${urlObj.origin}${urlObj.pathname}?referrer_id=${referrer}`);
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
      <Text maxLines={1} flex="1" wordBreak="break-all">
        {url}
      </Text>
      {/* <IconButton
        iconProps={{ fill: true }}
        icon="ContentCopy"
        onClick={performCopyClipboard}
      /> */}

      <Button
        text={btnText}
        variant="text-button"
        textProps={{ px: 0 }}
        onClick={performCopyClipboard}
      />
    </Flex>
  );
}
