import { useTheme } from "styled-components";

import { Box, Text, Image, Flex } from "@/common/components/atoms";
import AppLink, { AppLinkType } from "@/common/components/objects/AppLink";
import { AnalyticsEvents } from "@/common/utils/analytics/types";

export default function DownloadMobileAppModalPage(): JSX.Element {
  const { space } = useTheme();

  return (
    <>
      <Box pt={space.xxs}>
        <Text textStyle="headline5">Never miss a stream!</Text>
        <Text>Get the android app</Text>
      </Box>

      <Box justifySelf="center" alignSelf="center">
        <Image
          src="/images/img_android_app_qr_code.png"
          alt="QR code"
          objectFit="cover"
          boxProps={{
            w: [200, 300],
          }}
        />

        <Flex pt={[space.xxxs, space.xxs]} justifyContent="center">
          <AppLink
            buttonType={AppLinkType.android}
            analyticsEventName={
              AnalyticsEvents.rsvp_modal_google_play_badge_clicked
            }
          />
        </Flex>
      </Box>
    </>
  );
}
