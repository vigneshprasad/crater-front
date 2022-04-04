import { AnyObject } from "immer/dist/internal";
import styled, { useTheme } from "styled-components";

import { Box, Grid, Image, Link, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";

const Container = styled(Box)`
  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    .content {
      text-align: center;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    ${Grid}: nth-child(odd) {
      .image {
        justify-self: end;
      }

      .content {
        justify-self: start;

        :nth-child(-n + 2) {
          text-align: start;
        }
      }
    }

    ${Grid}: nth-child(even) {
      .icon {
        grid-column: 2 / span 1;
        grid-row: 1 / span 3;
      }

      .image {
        grid-column: 3 / span 1;
        grid-row: 1 / span 3;
        justify-self: start;
      }

      .content {
        grid-column: 1 / span 1;
        grid-row: 1 / span 3;
        justify-self: end;
        text-align: end;
      }
    }
  }
`;

export default function CreatorHubJourneyTab(): JSX.Element {
  const { space } = useTheme();

  const journeyData = [
    {
      image: (
        <Image
          src="/images/img_journey_step_1.png"
          alt="step 1"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_1.png"
          alt="planet 1"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0" maxWidth={["none", 120]}>
            Crater Onboarding
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            The first step is a call with our team to walk you through the
            product, answer questions & just get to know each other.
          </Text>
          <a
            href="https://calendly.com/craterclub/go_live_on_crater?utm_source=website&utm_medium=navbar"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              my={space.xxs}
              mx={["auto", 0]}
              text="Talk to Us"
              variant="round"
              bg="#7D52C5"
              borderColor="#7D52C5"
            />
          </a>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_2.png"
          alt="step 2"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_2.png"
          alt="planet 2"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0">
            It Begins!
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Start by setting up your first live stream to interact with your new
            community & start growing your audience.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_3.png"
          alt="step 3"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_3.png"
          alt="planet 3"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0" maxWidth={["none", 120]}>
            Stream Everywhere
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            From Crater, you will have the ability to stream live across all
            social media platforms at the same time.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_4.png"
          alt="step 4"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_4.png"
          alt="planet 4"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0">
            Explore Analytics
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Post your stream you will be given access to an analytics dashboard
            with the ability to email your followers, see detailed metrics &
            improve your content.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_5.png"
          alt="step 5"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_5.png"
          alt="planet 5"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0" maxWidth={["none", 140]}>
            New day, New Stream
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Complete 2 streams on two different days, to unlock a whole new set
            of perks that are set up to aid you in your journey.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_6.png"
          alt="step 6"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_6.png"
          alt="planet 6"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text
            textStyle="headline5"
            color="#AD8EE0"
            maxWidth={["none", 120]}
            ml="auto"
          >
            Amplified Distribution
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Once you complete 2 streams you are eligible for amplified
            distribution. Whereby, you will get a dedicated manager to help
            spread the word & grow your audience.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_7.png"
          alt="step 7"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_7.png"
          alt="planet 7"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0">
            Your Own TV Show
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Get the ability to set up your own TV series once you complete 6 hrs
            of streaming. Our content team will help you best optimize your
            content for max engagement & awareness.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_8.png"
          alt="step 8"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_8.png"
          alt="planet 8"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text
            textStyle="headline5"
            color="#AD8EE0"
            maxWidth={["none", 120]}
            ml="auto"
          >
            Launch an Auction
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Alongside your TV show, you have the ability to launch an auction.
            It works like an IPL auction but to monetize content, time &
            communities.
          </Text>
        </>
      ),
    },
    {
      image: (
        <Image
          src="/images/img_journey_step_9.png"
          alt="step 9"
          boxProps={{ w: [100, 200] }}
        />
      ),
      icon: (
        <Image
          src="/images/img_journey_planet_9.png"
          alt="planet 9"
          boxProps={{
            w: 100,
          }}
        />
      ),
      content: (
        <>
          <Text textStyle="headline5" color="#AD8EE0">
            Crater Affiliate
          </Text>
          <Text pt={space.xxxs} maxWidth={[300, 200]}>
            Once you complete 10 streams in 10 days, you become eligible for our
            affiliate program. Get access to brand sponsorships, dedicated
            content teams & much more.
          </Text>
        </>
      ),
    },
  ];

  return (
    <Box overflowY="auto" px={[space.xxs, space.s]} py={space.xs}>
      <Box pb={space.xs}>
        <Text textStyle="headline3" textAlign="center">
          Start your creator journey
        </Text>
        <Text textStyle="headline3" textAlign="center">
          on Crater.Club
        </Text>
      </Box>

      <Box m="0 auto" w={[200, 250]}>
        <Link
          href="https://www.youtube.com/watch?v=nWqxG9srgqE&t=1s"
          boxProps={{ target: "_blank" }}
        >
          <Image src="/images/img_journey_moon_video.png" alt="journey video" />
        </Link>
      </Box>

      <Box py={space.s}>
        <Container>
          {journeyData.map((data: AnyObject, index: number) => {
            return (
              <Grid
                mb={[space.xs, space.m]}
                gridTemplateColumns={["1fr", "1fr max-content 1fr"]}
                key={index}
                justifyItems="center"
                alignItems="center"
                gridRowGap={[space.xs, 0]}
                gridColumnGap={space.m}
              >
                <Box className="image">{data.image}</Box>
                <Box className="icon" display={["none", "grid"]}>
                  {data.icon}
                </Box>
                <Box className="content">{data.content}</Box>
              </Grid>
            );
          })}
        </Container>
      </Box>
    </Box>
  );
}
