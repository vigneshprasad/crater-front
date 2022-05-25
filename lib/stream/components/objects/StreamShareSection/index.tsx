import { useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Text } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import SocialShareButtons from "@/common/components/objects/SocialShareButtons";
import SocialShareUtils from "@/common/utils/social/SocialShareUtils";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream?: Webinar;
}

export default function StreamShareSection({ stream }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [shareUrl, setShareUrl] = useState<string | undefined>();
  const { user, profile } = useAuth();

  useEffect(() => {
    const urlObj = new URL(window.location.href);

    if (user) {
      setShareUrl(`${urlObj.origin}${urlObj.pathname}?referrer_id=${user.pk}`);
      return;
    }

    setShareUrl(`${urlObj.origin}${urlObj.pathname}`);
  }, [user]);

  const socialButtons = useMemo(() => {
    if (typeof window === "undefined") return null;

    return (
      <>
        <a
          href={SocialShareUtils({
            user,
            webinar: stream,
            profile,
          }).getLinkedInShareLink()}
          target="_blank"
          rel="noreferrer"
        >
          <SocialShareButtons w="100%" label="LinkedIn" icon="Linkedin" />
        </a>

        <a
          href={SocialShareUtils({
            user,
            webinar: stream,
            profile,
          }).getTwitterShareLink()}
          target="_blank"
          rel="noreferrer"
        >
          <SocialShareButtons w="100%" label="Twitter" icon="Twitter" />
        </a>
        <a
          href={SocialShareUtils({
            user,
            webinar: stream,
            profile,
          }).getWhatsappShareLink()}
          target="_blank"
          rel="noreferrer"
        >
          <SocialShareButtons w="100%" label="Whatsapp" icon="Whatsapp" />
        </a>
      </>
    );
  }, [user, stream, profile]);

  return (
    <Box as="section" bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Box p={space.xxs} background={colors.primaryLight}>
        <Text color={colors.textSecondary} textStyle="cardHeader">
          Share this stream
        </Text>
      </Box>
      <Box p={space.xxs}>
        <Text color={colors.textSecondary} textStyle="body">
          Copy stream link
        </Text>

        <Flex
          borderRadius={radii.xxxxs}
          my={space.xxxs}
          bg={colors.primaryBackground}
          py={space.xxxxs}
          px={space.xxxs}
          alignItems="center"
        >
          <Text textStyle="body" flex="1" maxLines={1}>
            {shareUrl}
          </Text>
          <IconButton icon="ContentCopy" />
        </Flex>

        <Box h={1} bg={colors.black[0]} />

        <Text my={space.xxxs} color={colors.textSecondary} textStyle="body">
          Share on social media
        </Text>
        <Flex flexDirection="column" gridGap={space.xxxs}>
          {socialButtons}
        </Flex>
      </Box>
    </Box>
  );
}
