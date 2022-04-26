import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Button, Flex, Text } from "@/common/components/atoms";
import { LEADERBOARD_URL } from "@/common/constants/url.constants";

import FaqExpander from "../../objects/FaqExpander";
import LeaderboardStepCard from "../../objects/LeaderboardStepCard";
import LeaderboardTable from "../../objects/LeaderboardTable";

export default function LeaderboardPage(): JSX.Element {
  const { colors, space } = useTheme();
  const router = useRouter();

  return (
    <Box>
      {/* <Text px={space.s} py={space.xxs} textStyle="title">
        Leaderboard
      </Text> */}

      <LeaderboardTable />

      <Box
        px={[space.xxs, space.s]}
        bg={colors.black[6]}
        pt={space.s}
        pb={space.s}
      >
        <Flex
          flexDirection={["column"]}
          justifyContent="center"
          maxWidth="75%"
          m="0 auto"
          textAlign="center"
          mb={space.xl}
        >
          <Text textStyle="title" textAlign="center" mb={space.xs}>
            LIVE STREAM &amp; WIN UPTO ₹50,000
          </Text>
          <Text mb={space.xs}>
            Take part in a competition with other streamers &amp; win 50K in
            cash prizes every month. Start by picking a category of streamers
            you want to compete against. Once you enter the competition, set up
            your stream invite your friends to watch. If you get the most time
            spent on your ( Number of Viewers x Watch Time ) you win the
            competition. There are both weekly &amp; monthly competitions &amp;
            prizes. Details are in the FAQ.
          </Text>
          <a href={LEADERBOARD_URL} target="_blank" rel="noreferrer">
            <Button m="auto" justifySelf="center" text="Join the challenge" />
          </a>
        </Flex>
        <Flex
          flexDirection={["column", "row"]}
          justifyContent="center"
          gridGap={[space.l, space.xs]}
        >
          <LeaderboardStepCard
            stepNumber="1"
            color="#ffe36c"
            image={STATIC_IMAGES.ImageHand}
            heading="Select a Competition"
          />

          <LeaderboardStepCard
            stepNumber="2"
            color="#85f978"
            image={STATIC_IMAGES.ImageTv}
            heading="Stream & Engage"
          />

          <LeaderboardStepCard
            stepNumber="3"
            color="#f2f2f2"
            image={STATIC_IMAGES.ImageCash}
            heading="Win & Earn"
          />
        </Flex>
      </Box>

      <Box px={[space.xs, space.s]} py={space.xs}>
        <Text textAlign="center" textStyle="headline5">
          FAQ&apos;s
        </Text>

        <Flex
          flexDirection="column"
          gridGap={space.xxs}
          py={space.s}
          px={[0, space.s]}
          maxWidth={["auto", "70%"]}
          m="0 auto"
        >
          <FaqExpander
            heading="Who is eligible to compete in the leaderboard?"
            subText="We have three live competitions at the moment: for designers, finance gurus ( stock traders & financial experts) & free for all. In free for all anyone in the professional realm, such as marketers, mentors & coaches, can compete."
          />

          <FaqExpander
            heading="How is the winner determined, weekly & monthly?"
            subText="The streamer with the most time viwed in their category wins. Time spent is equal to the number of viewers x watch time. This is done weekly & monthly. The max stream length is 2 hrs a day."
          />

          <FaqExpander
            heading="What do I get if I am the top weekly or monthly streamer?"
            subText="Weekly prizes: leader (1st) gets paid 6k, 2nd 3k & third 1k. Monthly bumper prize: the top streamer in the category gets 50k, 2nd place gets 10k & 3rd gets 5k. Prize money is subject to tds & applicable taxes"
          />

          <FaqExpander
            heading="Can I compete in more than one category?"
            subText="No. You can only be part of one category. But you can compete in the weekly & monthly leaderboards for that category."
          />

          <FaqExpander
            heading="Can I be eligible to win the weekly & monthly prize?"
            subText="Yes!"
          />

          <FaqExpander
            heading="What is the start date for the competition?"
            subText="You can join the competition anytime, once a competition is live."
          />
        </Flex>
      </Box>
    </Box>
  );
}
