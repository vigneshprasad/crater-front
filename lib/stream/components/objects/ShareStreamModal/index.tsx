import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Modal, Text } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import SocialShareUtils from "@/common/utils/social/SocialShareUtils";
import { PastStreamListItem, Webinar } from "@/community/types/community";

interface IProps {
  stream?: Webinar | PastStreamListItem;
  visible: boolean;
  url?: string;
  onClose: () => void;
}

export default function ShareStreamModal({
  stream,
  visible,
  url,
  onClose,
}: IProps): JSX.Element | null {
  const { space, colors, radii } = useTheme();
  const { user, profile } = useAuth();
  const [shareUrl, setShareUrl] = useState<string | undefined>();

  const performCopyClipboard = useCallback(async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
    }
  }, [shareUrl]);

  useEffect(() => {
    const pathname = url ? url : window.location.pathname;
    const urlObj = new URL(`${pathname}`, `${window.location.origin}`);
    urlObj.searchParams.delete("tab");

    if (user) {
      urlObj.searchParams.append("referrer_id", user.pk);
      setShareUrl(urlObj.href);
      return;
    }

    setShareUrl(`${urlObj.origin}${urlObj.pathname}`);
  }, [user, url]);

  if (typeof window === "undefined") return null;

  return (
    <Modal
      py={space.xxs}
      maxWidth={680}
      maxHeight={340}
      bg={colors.primaryDark}
      display="flex"
      flexDirection="column"
      gridGap={space.xxs}
      visible={visible}
      onClose={onClose}
      border="1px solid #373737"
      borderRadius={radii.xxxxs}
      iconButtonProps={{
        top: 8,
        variant: "flatNoBg",
        iconProps: {
          size: 28,
        },
      }}
    >
      <Box>
        <Text
          px={space.xxs}
          pb={space.xxs}
          textStyle="label"
          color="#EDEDED"
          textTransform="uppercase"
        >
          Share this stream
        </Text>
        <Box borderBottom={`1px solid ${colors.primaryLight}`} />
      </Box>

      <Box px={space.xxs}>
        <Text pb={14}>Share on social media</Text>

        <Flex
          flexDirection="row"
          gridGap={space.xs}
          alignItems="center"
          justifyItems="center"
        >
          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <a
              href={SocialShareUtils({
                user,
                webinar: stream,
                profile,
                customUrl: shareUrl,
              }).getTwitterShareLink()}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton
                w={48}
                h={48}
                buttonStyle="round-large"
                iconProps={{ fill: true }}
                icon="Twitter"
              />
            </a>
            <Text textStyle="body" color="#F6F6F6">
              Twitter
            </Text>
          </Flex>

          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <a
              href={SocialShareUtils({
                user,
                webinar: stream,
                profile,
                customUrl: shareUrl,
              }).getLinkedInShareLink()}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton
                w={48}
                h={48}
                buttonStyle="round-large"
                iconProps={{ fill: true }}
                icon="Linkedin"
              />
            </a>
            <Text textStyle="caption" color="#F6F6F6">
              LinkedIn
            </Text>
          </Flex>

          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <a
              href={SocialShareUtils({
                user,
                webinar: stream,
                profile,
                customUrl: shareUrl,
              }).getWhatsappShareLink()}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton
                w={48}
                h={48}
                buttonStyle="round-large"
                iconProps={{ fill: true }}
                icon="Whatsapp"
              />
            </a>
            <Text textStyle="caption" color="#F6F6F6">
              WhatsApp
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Box px={space.xxs} py={space.xxs}>
        <Text pb={space.xxxs} textStyle="captionLarge">
          Copy stream link
        </Text>
        <Flex
          px={space.xxxs}
          py={space.xxxxs}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          bg={colors.primaryBackground}
          borderRadius={radii.xxxxs}
        >
          <Text textStyle="body" maxLines={1} wordBreak="break-word">
            {shareUrl}
          </Text>
          <IconButton icon="ContentCopy" onClick={performCopyClipboard} />
        </Flex>
      </Box>
    </Modal>
  );
}
