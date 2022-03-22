import { useTheme } from "styled-components";

import { Marquee, Text, Box, Span } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

export default function MeetingsTicker(): JSX.Element {
  const { upcoming } = useUpcomingStreams();
  const { colors, space } = useTheme();

  if (!upcoming) {
    return <Box h={40} />;
  }

  const content: JSX.Element[] = upcoming?.reduce((acc, curr) => {
    const date = DateTime.parse(curr.start).toFormat("dd LLL");
    const time = DateTime.parse(curr.start).toFormat("t");

    return [
      ...acc,
      <Span mr={space.s} key={curr.id}>
        {curr.host_detail.name} <Span color={colors.red[0]}>{date}</Span> {"  "}
        @{"  "}
        <Span color={colors.greenSuccess}>
          {"  "}
          {time}
        </Span>
      </Span>,
      ,
    ] as JSX.Element[];
  }, [] as JSX.Element[]);

  return (
    <Marquee>
      <Text textStyle="title" whiteSpace="nowrap">
        {content}
      </Text>
    </Marquee>
  );
}
