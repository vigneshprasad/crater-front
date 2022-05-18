import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Text } from "@/common/components/atoms";
import UrlShare from "@/community/components/objects/UrlShare";

interface IProps {
  streamId?: number;
}

export default function StreamCreationModalTestGear({
  streamId,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { user } = useAuth();

  return (
    <>
      <Text textStyle="headline6" color="#D5BBFF" pb={space.xxs}>
        Test your gear
      </Text>

      <Box gridColumn="1 / span 2">
        <Text w={345} lineHeight="180%" maxLines={3}>
          Prior to your stream, we suggest testing the audio/video permissions
          of your browser. Do this by clicking on the link below.
        </Text>

        <Box pt={space.xs}>
          <UrlShare
            shareUrl={`/livestream/${streamId}`}
            referrer={user?.pk}
            icon={true}
            iconButtonVariant="flatNoBg"
            px={space.xxxs}
            py={space.xxxxs}
            bg={colors.black[0]}
          />
        </Box>
      </Box>
    </>
  );
}
