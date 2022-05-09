import { useTheme } from "styled-components";

import { Box, Text, Flex, Grid, IconButton } from "@/common/components/atoms";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import ReferralStepsStatic from "@/tokens/components/objects/ReferralStepsStatic";
import { ReferralSummary } from "@/tokens/types/referrals";

import TrackReferralsBox from "../TrackReferralsBox";
import UrlShare from "../UrlShare";

interface IProps {
  user?: string;
  referralSummary?: ReferralSummary;
  shareUrl: () => string | undefined;
  trackModalAnalytics: (eventName: AnalyticsEvents) => void;
}

export default function ShareAndEarnModalPage({
  user,
  referralSummary,
  shareUrl,
  trackModalAnalytics,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const referralShareText = `Hey,\n\nI will be joining this livestream on Crater.Club: a live streaming & auctions platform for creators & educators.\nSharing the link with you as I think you will enjoy the content & the interaction with the streamer.\n\n`;

  return (
    <>
      <Box pt={space.xxs}>
        <Text textStyle="headline5">Share and Earn</Text>
      </Box>

      <Box>
        <Text pb={space.xxs} textStyle="captionLarge">
          Earn ₹100 for every referral 🎉
        </Text>

        <UrlShare referrer={user} />

        <Flex
          pt={space.xs}
          flexDirection="row"
          gridGap={space.xs}
          justifyContent="space-evenly"
        >
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              referralShareText
            )}${shareUrl()}`}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              variant="flat"
              icon="Whatsapp"
              iconProps={{
                color: colors.white[0],
                fill: true,
                size: [20, 30],
              }}
              onClick={() =>
                trackModalAnalytics(
                  AnalyticsEvents.rsvp_modal_referral_whatsapp_share
                )
              }
            />
          </a>

          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl()}`}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              variant="flat"
              icon="Linkedin"
              iconProps={{
                color: colors.white[0],
                fill: true,
                size: [20, 30],
              }}
              onClick={() =>
                trackModalAnalytics(
                  AnalyticsEvents.rsvp_modal_referral_linkedin_share
                )
              }
            />
          </a>

          <a
            href={`https://twitter.com/share?text=${encodeURIComponent(
              referralShareText
            )}&url=${shareUrl()}`}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              variant="flat"
              icon="Twitter"
              iconProps={{
                color: colors.white[0],
                fill: true,
                size: [20, 30],
              }}
              onClick={() =>
                trackModalAnalytics(
                  AnalyticsEvents.rsvp_modal_referral_twitter_share
                )
              }
            />
          </a>
        </Flex>

        <Grid
          pt={space.xs}
          gridTemplateColumns={["1fr", "1fr auto"]}
          gridTemplateRows={["1fr auto", "1fr"]}
          gridGap={space.xxs}
        >
          <Box>
            <Text textStyle="headline6" pb={space.xxxs}>
              How it works?
            </Text>
            <ReferralStepsStatic imageSize={30} />
          </Box>
          <TrackReferralsBox referralSummary={referralSummary} />
        </Grid>
      </Box>
    </>
  );
}
