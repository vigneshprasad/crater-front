import HeroImage from "public/images/img_creatorhub.png";
import DistributionImage from "public/images/img_distribution.png";
import EngagementImage from "public/images/img_engagement.png";
import MonetizationImage from "public/images/img_monetization.png";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Card, Grid, Text, Box } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";

import StaticHubCard from "../StaticHubCard";

export default function CreatorHubFaqTab(): JSX.Element {
  const { space, colors } = useTheme();

  return (
    <Box m="0 auto" overflowY="auto" px={[space.xxs, space.s]} py={space.s}>
      <Grid gridTemplateColumns={["1fr", "repeat(4, 1fr)"]} gridGap={space.xs}>
        <Card
          gridColumn={["1 / span 1", "1 / span 4"]}
          containerProps={{
            display: "grid",
            gridTemplateColumns: ["1fr", "2fr 1fr"],
            p: 0,
            px: 0,
            alignItems: "center",
          }}
        >
          <Box px={space.s} py={space.s}>
            <Text textStyle="headline6" mb={space.xxxs}>
              Stream live &amp; monetize on Crater
            </Text>
            <Text
              color={colors.white[1]}
              mb={space.xs}
              pr={[space.xs, space.s]}
            >
              If you have knowledge to impart or a skill to share there is an
              audience waiting for you. On Crater, approved creators &amp;
              mentors get to go live &amp; interact with our community. We take
              care of everything. From helping you bring the crowd, engaging
              your community &amp; monetizing your time.
            </Text>
            <a
              href="https://calendly.com/craterclub/introduction-to-crater?utm_source=website&utm_medium=navbar"
              target="_blank"
              rel="noreferrer"
            >
              <Button text="Talk to us" />
            </a>
          </Box>

          <Box position="relative" h={[140, "100%"]}>
            <Image
              src={HeroImage}
              layout="fill"
              alt="Creator Hub"
              objectFit="cover"
            />
          </Box>
        </Card>

        <Text
          textStyle="headline6"
          px={space.xxxs}
          gridColumn={["1 / span 1", "1 / span 4"]}
        >
          Why go live on Crater?
        </Text>

        <StaticHubCard
          heading="Distribution"
          description="We promote the sessions, create the collaterals, share the
          recordings, share the user profiles &amp; allow you to stream on
          multiple platforms."
          image={DistributionImage}
        />

        <StaticHubCard
          heading="Engagement"
          description="We facilitate 1:1 interactions within your community when you are
      not live. This helps retain your audience &amp; in building a true
      community."
          image={EngagementImage}
        />

        <StaticHubCard
          heading="Monetization"
          description="When you hit 1000s community members, you can launch a private
      auction to monetize. We also promote your websites, courses &amp;
      links."
          image={MonetizationImage}
        />
      </Grid>
    </Box>
  );
}
