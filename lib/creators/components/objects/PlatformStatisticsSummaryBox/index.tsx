import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Flex, Grid, Span, Text } from "@/common/components/atoms";

interface IProps {
  totalCreators: number;
  totalStreams: number;
  chatEngagement: number;
  totalStreamTime: number;
}

type ValueKeys = keyof IProps;

export default function PlatformStatisticsSummaryBox(
  props: IProps
): JSX.Element {
  const { space, colors, radii } = useTheme();

  const { totalCreators, totalStreams, chatEngagement, totalStreamTime } =
    props;

  const columns = useMemo<
    {
      key: ValueKeys;
      title: string;
      display: JSX.Element;
      bg?: string;
      textColor?: string;
    }[]
  >(() => {
    return [
      {
        key: "totalCreators",
        title: "Total Creators on Crater",
        display: (
          <Text fontSize="4.0rem" fontWeight={500}>
            {totalCreators}
          </Text>
        ),
        bg: colors.accent,
        textColor: "#EDEDED",
      },
      {
        key: "totalStreams",
        title: "Total Streams",
        display: (
          <Text fontSize="4.0rem" fontWeight={500}>
            {totalStreams}
          </Text>
        ),
      },
      {
        key: "chatEngagement",
        title: "Chat Engagement",
        display: (
          <Text fontSize="2.0rem" fontWeight={500}>
            <Span fontSize="4.0rem">{chatEngagement}</Span> questions
          </Text>
        ),
      },
      {
        key: "totalStreamTime",
        title: "Total Stream Time",
        display: (
          <Text fontSize="2.0rem" fontWeight={500}>
            <Span fontSize="4.0rem">{totalStreamTime}</Span> mins
          </Text>
        ),
      },
    ];
  }, [colors, totalCreators, totalStreams, chatEngagement, totalStreamTime]);

  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gridGap={space.xxxs}>
      {columns.map(({ key, title, display, bg, textColor }) => {
        return (
          <Flex
            p={24}
            flexDirection="column"
            gridGap={space.xxs}
            bg={bg ?? colors.primaryBackground}
            borderRadius={radii.xxxxs}
            border={`1px solid ${colors.secondaryLight}`}
            key={key}
          >
            <Text
              textStyle="label"
              color={textColor ?? colors.textPrimary}
              textTransform="uppercase"
            >
              {title}
            </Text>
            {display}
          </Flex>
        );
      })}
    </Grid>
  );
}
