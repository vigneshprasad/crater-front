import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Box, Flex, Text } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";

export default function CreatorJourneyCardSwitch(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [activeCard, setActiveCard] = useState(0);

  const variants = {
    hidden: {
      opacity: 1,
      x: "0%",
      y: "0%",
      transitionEnd: {
        display: "none",
      },
    },
    active: {
      display: "block",
      opacity: 1,
      x: "0%",
      y: "0%",
      scale: 1.0,
    },
  };

  const data = useMemo(
    () => [
      {
        key: "getDiscovered",
        title: "Get Discovered",
        text: `People come to crater to tune into content related to finance,
      design, Web 3, marketing & other professional fields.
      Consequently, if you are a budding creator in these fields it
      helps you get discovered by the right audience.`,
      },
      {
        key: "streamEverywhere",
        title: "Stream Everywhere",
        text: `With Crater you have the ability to go live on multiple social
      media platforms as well. Thereby, engaging your current
      community while also building a new community of viewers on
      CraterClub.`,
      },
      {
        key: "analyseData",
        title: "Analyse Data",
        text: `Our analytics dashboard helps you create better content &
      engage your audience. From suggesting what topics to create
      content on to what is the completion rate & emails of your
      followers, everything is made available to you.`,
        animate: "prev2",
      },
      {
        key: "launchAuctions",
        title: "Launch Auctions",
        text: `Professionals want to monetize time, content, goods &
      communities. With Crater you can host private auctions & get
      the price for everything from the art you create on a stream
      to the discord community that you are building up.`,
      },
    ],
    []
  );

  const onClickDown = useCallback(() => {
    if (activeCard === data.length - 1) {
      setActiveCard(0);
    } else {
      setActiveCard((prev) => prev + 1);
    }
  }, [data, activeCard]);

  const onClickUp = useCallback(() => {
    if (activeCard === 0) {
      setActiveCard(data.length - 1);
    } else {
      setActiveCard((prev) => prev - 1);
    }
  }, [data, activeCard]);

  return (
    <Flex flexDirection={["column", "row"]} gridGap={[space.xs, 40]}>
      <Box>
        {data.map(({ key, title, text }, index) => (
          <AnimatedBox
            variants={variants}
            w={[335, 400]}
            h={[160, 185]}
            py={[space.xs, 32]}
            px={[24, 40]}
            bg={colors.primaryDark}
            borderRadius={radii.xxs}
            animate={activeCard === index ? "active" : "hidden"}
            overflow="hidden"
            key={key}
          >
            <Text
              fontSize={["1.6rem", "2.0rem"]}
              fontWeight={600}
              lineHeight={["2.0rem", "2.4rem"]}
            >
              {title}
            </Text>
            <Text
              pt={space.xxxxs}
              textStyle="notificationDesc"
              color={colors.textTertiary}
            >
              {text}
            </Text>
          </AnimatedBox>
        ))}
      </Box>

      <Flex
        pt={[0, space.xs]}
        flexDirection={["row", "column"]}
        justifyContent={["center", "start"]}
        gridGap={space.xxs}
        zIndex={1}
      >
        <IconButton
          buttonStyle="round-large"
          icon="ChevronUp"
          w={40}
          h={40}
          onClick={onClickUp}
        />
        <IconButton
          buttonStyle="round-large"
          icon="ChevronDown"
          w={40}
          h={40}
          onClick={onClickDown}
        />
      </Flex>
    </Flex>
  );
}
