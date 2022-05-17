import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import {
  BoxProps,
  Button,
  Flex,
  IconButton,
  Text,
} from "@/common/components/atoms";

interface IProps extends BoxProps {
  referrer?: string;
  shareUrl?: string;
  icon?: boolean;
  iconButtonVariant?: string;
}

export default function UrlShare({
  referrer,
  shareUrl,
  icon,
  iconButtonVariant,
  ...rest
}: IProps): JSX.Element {
  const [url, setUrl] = useState("");
  const { space, radii, colors, borders } = useTheme();
  const [btnText, setBtnText] = useState("Share now");

  const performCopyClipboard = useCallback(async () => {
    if (!icon) setBtnText("Copied");
    if (url) {
      await navigator.clipboard.writeText(url);
    }

    if (!icon) setTimeout(() => setBtnText("Share now"), 500);
  }, [url, icon]);

  useEffect(() => {
    const location = window.location.href;
    const urlObj = new URL(location);

    const pathname = shareUrl ? shareUrl : urlObj.pathname;

    if (referrer) {
      setUrl(`${urlObj.origin}${pathname}?referrer_id=${referrer}`);
    } else {
      setUrl(`${urlObj.origin}${pathname}`);
    }
  }, [referrer, shareUrl]);

  return (
    <Flex
      alignItems="center"
      px={space.xs}
      py={space.xxs}
      bg={colors.black[2]}
      borderRadius={radii.xxs}
      border={`2px solid ${borders.main}`}
      {...rest}
    >
      <Text maxLines={1} flex="1" wordBreak="break-word">
        {url}
      </Text>

      {icon ? (
        <IconButton
          variant={iconButtonVariant}
          iconProps={{ fill: true }}
          icon="ContentCopy"
          onClick={performCopyClipboard}
        />
      ) : (
        <Button
          text={btnText}
          variant="text-button"
          textProps={{ px: 0 }}
          onClick={performCopyClipboard}
          disabled={btnText === "Copied"}
        />
      )}
    </Flex>
  );
}
