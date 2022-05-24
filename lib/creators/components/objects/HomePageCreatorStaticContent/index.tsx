import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Span,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

export default function HomePageCreatorStaticContent(): JSX.Element {
  const { space, colors } = useTheme();

  const data = [
    {
      image: "/images/img_journey_step_1.png",
      title: "Get Discovered",
      text: `People come to crater to tune into content related to finance,
      design, Web 3, marketing & other professional fields.
      Consequently, if you are a budding creator in these fields it
      helps you get discovered by the right audience.`,
      column: "2",
      row: "1",
    },
    {
      image: "/images/img_journey_step_4.png",
      title: "Analyse Data",
      text: `Our analytics dashboard helps you create better content &
      engage your audience. From suggesting what topics to create
      content on to what is the completion rate & emails of your
      followers, everything is made available to you.`,
      column: "2",
      row: "2",
      button: true,
    },
    {
      image: "/images/img_journey_step_3.png",
      title: "Stream Everywhere",
      text: `With Crater you have the ability to go live on multiple social
      media platforms as well. Thereby, engaging your current
      community while also building a new community of viewers on
      CraterClub.`,
      column: "3",
      row: "1",
    },
    {
      image: "/images/img_journey_step_8.png",
      title: "Launch Auctions",
      text: `Professionals want to monetize time, content, goods &
      communities. With Crater you can host private auctions & get
      the price for everything from the art you create on a stream
      to the discord community that you are building up.`,
      column: "3",
      row: "2",
    },
  ];

  return (
    <>
      <Box pb={space.s}>
        <Text textStyle="mainHeading" textAlign="center">
          Become a Creator
        </Text>
        <Text textStyle="small" textAlign="center">
          Start streaming on <Span color={colors.accentLight}>Crater</Span>,
          here&apos;s why
        </Text>
      </Box>

      <Box w={462} position="absolute" left={24} top={25}>
        <Image src="/images/img_become_a_creator.png" alt="Become a creator" />
      </Box>

      <Box w={40} position="absolute" left="13%" top="27.5%">
        <Link
          href="https://www.youtube.com/watch?v=nWqxG9srgqE&t=1s"
          boxProps={{ target: "_blank" }}
        >
          <Image src="/images/img_play_button.png" alt="Play" />
        </Link>
      </Box>

      <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap={space.s}>
        {data.map(({ image, title, text, column, row, button }, index) => {
          return (
            <Box key={index} gridColumn={column} gridRow={row}>
              <Flex gridGap={space.xxxxs}>
                <Image src={image} alt={title} boxProps={{ w: "50%" }} />
                <Box>
                  <Text pb={space.xxxxxs}>{title}</Text>
                  <Text textStyle="small" lineHeight="2.1rem" color="#C4C4C4">
                    {text}
                  </Text>

                  {button && (
                    <Button
                      mt={space.s}
                      label="Start your journey"
                      display="flex"
                      alignItems="center"
                      gridGap={space.xxxxxs}
                    >
                      <Icon icon="ChevronRight" size={20} />
                    </Button>
                  )}
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </>
  );
}
