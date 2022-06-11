import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { BottomSheet, Flex, Grid, Text } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import SocialShareUtils from "@/common/utils/social/SocialShareUtils";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream?: Webinar;
  visible: boolean;
  onClose: () => void;
}

export default function ShareStreamBottomSheet({
  stream,
  visible,
  onClose,
}: IProps): JSX.Element | null {
  const { space, colors } = useTheme();
  const { user, profile } = useAuth();
  const [shareUrl, setShareUrl] = useState<string | undefined>();

  const performCopyClipboard = useCallback(async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
    }
  }, [shareUrl]);

  useEffect(() => {
    const urlObj = new URL(window.location.href);

    if (user) {
      setShareUrl(`${urlObj.origin}${urlObj.pathname}?referrer_id=${user.pk}`);
      return;
    }

    setShareUrl(`${urlObj.origin}${urlObj.pathname}`);
  }, [user]);

  if (typeof window === "undefined") return null;

  return (
    <BottomSheet
      heading="Share stream"
      bg={colors.primaryDark}
      visible={visible}
      onClose={onClose}
      boxProps={{
        px: space.xxxs,
        pt: space.xxxs,
        pb: space.xxxxxs,
        bg: colors.primaryDark,
      }}
    >
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        py={space.xxs}
        gridGap={space.xxs}
      >
        <Flex
          flexDirection="column"
          gridGap={space.xxxs}
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            buttonStyle="round-large"
            icon="ContentCopy"
            onClick={performCopyClipboard}
          />
          <Text textStyle="body">Copy link</Text>
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
            }).getLinkedInShareLink()}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              buttonStyle="round-large"
              icon="Linkedin"
              iconProps={{ fill: true }}
            />
          </a>
          <Text textStyle="body">LinkedIn</Text>
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
            }).getTwitterShareLink()}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              buttonStyle="round-large"
              iconProps={{ fill: true }}
              icon="Twitter"
            />
          </a>
          <Text textStyle="body">Twitter</Text>
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
            }).getWhatsappShareLink()}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              buttonStyle="round-large"
              iconProps={{ fill: true }}
              icon="Whatsapp"
            />
          </a>
          <Text textStyle="body">Whatsapp</Text>
        </Flex>
      </Grid>
    </BottomSheet>
  );
}
