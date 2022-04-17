import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Box, Flex, Text } from "@/common/components/atoms";

import FaqExpander from "../../objects/FaqExpander";
import LeaderboardStepCard from "../../objects/LeaderboardStepCard";
import LeaderboardTable from "../../objects/LeaderboardTable";

export default function LeaderboardPage(): JSX.Element {
  const { colors, space } = useTheme();

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
        <Text textStyle="title" textAlign="center" mb={space.xs}>
          It&apos;s easy to stream and win on Crater
        </Text>
        <Text maxWidth="75%" m="0 auto" textAlign="center" mb={space.xl}>
          Take part in a competition with other streamers &amp; win about 50K in
          cash prizes. Start by picking a category of streamers you want to
          compete against. Once you enter the competition, set up your stream
          &amp; invite your friends to watch. If you get the most time spent on
          your stream ( Number of Viewers x Watch time) you win the competition.
          There are both weekly &amp; monthly competitions &amp; prizes.
        </Text>
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
            subText="The streamer with the most time viwed in their category wins. Time spent is equal to the number os viewers x watch time. This is done weekly & monthly. The max stream lenght is 2 hrs a day."
          />

          <FaqExpander
            heading="What do I get if I am the top weekly or monthly streamer?"
            subText="Weekly prizes: leader (1st) gets paid 5k, 2nd 3k & third 2k. Monthly bumper prize: the top streamer in the category gets 50k, 2nd place gets 20k & 3rd gets 10k. Prize money is subject to tds & applicable taxes"
          />

          <FaqExpander
            heading="Can I compete in more than one category?"
            subText="Weekly prizes: leader (1st) gets paid 5k, 2nd 3k & third 2k. Monthly bumper prize: the top streamer in the category gets 50k, 2nd place gets 20k & 3rd gets 10k. Prize money is subject to tds & applicable taxes"
          />

          <FaqExpander
            heading="Can I be eligible to win the weekly & monthly prize?"
            subText="Yes!"
          />
        </Flex>
      </Box>
    </Box>
  );
}
