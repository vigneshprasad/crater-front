import { useTheme } from "styled-components";

import {
  Box,
  Grid,
  Icon,
  Image,
  Link,
  Span,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { START_CREATOR_JOURNET_CALENDLY } from "@/common/constants/url.constants";

export default function HomePageCreatorStaticContent(): JSX.Element {
  const { space, colors, fonts } = useTheme();

  const data = [
    {
      image: "/images/img_journey_step_1.png",
      title: "Get Discovered",
      text: `People come to crater to tune into content related to finance,
      design, Web 3, marketing & other professional fields.
      Consequently, if you are a budding creator in these fields it
      helps you get discovered by the right audience.`,
    },
    {
      image: "/images/img_journey_step_3.png",
      title: "Stream Everywhere",
      text: `With Crater you have the ability to go live on multiple social
      media platforms as well. Thereby, engaging your current
      community while also building a new community of viewers on
      CraterClub.`,
    },
    {
      image: "/images/img_journey_step_4.png",
      title: "Analyse Data",
      text: `Our analytics dashboard helps you create better content &
      engage your audience. From suggesting what topics to create
      content on to what is the completion rate & emails of your
      followers, everything is made available to you.`,
      button: true,
    },
    {
      image: "/images/img_journey_step_8.png",
      title: "Launch Auctions",
      text: `Professionals want to monetize time, content, goods &
      communities. With Crater you can host private auctions & get
      the price for everything from the art you create on a stream
      to the discord community that you are building up.`,
    },
  ];

  return (
    <>
      <Box>
        <Text
          fontFamily={fonts.heading}
          textStyle="mainHeading"
          textAlign="center"
        >
          Become a Creator
        </Text>
        <Text textStyle="body" textAlign="center">
          Start streaming on <Span color={colors.accentLight}>Crater</Span>,
          here&apos;s why
        </Text>
      </Box>

      <Grid gridTemplateColumns={["1fr", "min-content 2fr"]}>
        <Box w={400} position="relative" display={["none", "grid"]}>
          <Image
            src="/images/img_become_a_creator.png"
            alt="Become a creator"
          />

          <Box w={40} position="absolute" left={130} top={170}>
            <Link
              href="https://www.youtube.com/watch?v=nWqxG9srgqE&t=1s"
              boxProps={{ target: "_blank" }}
            >
              <Image src="/images/img_play_button.png" alt="Play" />
            </Link>
          </Box>
        </Box>

        <Grid
          py={[space.xs, space.s]}
          gridTemplateColumns={["1fr", "1fr 1fr"]}
          gridGap={[space.xs, space.m]}
        >
          {data.map(({ image, title, text, button }, index) => {
            return (
              <Grid
                gridTemplateColumns="min-content 1fr"
                gridGap={space.xxs}
                justifyItems="start"
                key={index}
              >
                <Box w={64}>
                  <Image src={image} alt={title} />
                </Box>
                <Box>
                  <Text fontFamily={fonts.heading} pb={space.xxxxxs}>
                    {title}
                  </Text>
                  <Text textStyle="small" lineHeight="2.1rem" color="#C4C4C4">
                    {text}
                  </Text>
                </Box>

                {button && (
                  <Box pt={space.xs} display={["none", "grid"]} gridColumn={2}>
                    <a
                      href={START_CREATOR_JOURNET_CALENDLY}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="flat-large"
                        label="Start your journey"
                        display="flex"
                        alignItems="center"
                        suffixElement={<Icon icon="ChevronRight" size={20} />}
                      />
                    </a>
                  </Box>
                )}
              </Grid>
            );
          })}

          <Box display={["grid", "none"]}>
            <a
              href={START_CREATOR_JOURNET_CALENDLY}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                label="Start your journey"
                display="flex"
                alignItems="center"
                suffixElement={<Icon icon="ChevronRight" size={20} />}
              />
            </a>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
