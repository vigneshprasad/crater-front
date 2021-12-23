import { useTheme } from "styled-components";
import useSWR from "swr";

import { Marquee, Text, Box, Span } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

export default function MeetingsTicker(): JSX.Element {
  const { data } = useSWR<Webinar[]>(
    API_URL_CONSTANTS.groups.getUpcominWebinars
  );
  const { colors, space } = useTheme();

  if (!data) {
    return <Box h={40} />;
  }

  const content: JSX.Element[] = data.reduce((acc, curr) => {
    const date = DateTime.parse(curr.start).toFormat("DD");
    const time = DateTime.parse(curr.start).toFormat("t");

    return [
      ...acc,
      <Span mr={space.s} key={curr.id}>
        {curr.topic_detail.name} <Span color={colors.red[0]}>{date}</Span>{" "}
        {"  "}@{"  "}
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
