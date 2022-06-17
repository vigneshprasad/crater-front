import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Image, Text } from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import SocialShareButtons from "@/common/components/objects/SocialShareButtons";
import SocialShareUtils from "@/common/utils/social/SocialShareUtils";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream?: Webinar;
  autoRsvp?: () => void;
}

export default function StreamShareSection({
  stream,
  autoRsvp,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [shareUrl, setShareUrl] = useState<string | undefined>();
  const { user, profile } = useAuth();

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

  return user ? (
    <Box as="section" bg={colors.primaryLight} borderRadius={radii.xxxxs}>
      <Box p={space.xxs} background={colors.primaryDark}>
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
          bg={colors.primaryLight}
          py={space.xxxxs}
          px={space.xxxs}
          alignItems="center"
        >
          <Text textStyle="body" flex="1" maxLines={1}>
            {shareUrl}
          </Text>
          <IconButton icon="ContentCopy" onClick={performCopyClipboard} />
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
  ) : (
    <>
      <Box
        p={space.xxs}
        background={colors.primaryDark}
        display={["none", "block"]}
      >
        <Text color={colors.textSecondary} textStyle="cardHeader">
          Share this stream
        </Text>
      </Box>
      <Flex
        gridTemplateRows="1fr min-content min-content"
        flexDirection="column"
        bg={[colors.primaryDark, colors.primaryLight]}
        px={space.xxxs}
        py={space.s}
        gridGap={space.xxs}
        alignItems="center"
      >
        <Box position="relative" w={120} h={120}>
          <Image
            src="/images/img_referral.png"
            alt="share stream"
            layout="fill"
          />
        </Box>
        <Text textStyle="captionLarge" textAlign="center">
          Login to share this stream with your friends!
        </Text>
        <Button
          m="0 auto"
          variant="outline-condensed"
          label="Login"
          onClick={() => autoRsvp && autoRsvp()}
        />
      </Flex>
    </>
  );
}
