import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Avatar, Flex, Grid, Text } from "@/common/components/atoms";
import { Speaker } from "@/community/types/community";

interface IProps {
  attendees: Speaker[];
  maxLength?: number;
}

export default function AttendeesPreview({
  attendees,
  maxLength = 5,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const items = useMemo(() => {
    return attendees.reduce((acc, curr) => {
      if (acc.length < maxLength) {
        return [...acc, curr];
      }
      return acc;
    }, [] as Speaker[]);
  }, [attendees, maxLength]);

  return (
    <Grid
      gridTemplateColumns="max-content 1fr"
      gridGap={space.xxs}
      px={12}
      alignItems="center"
    >
      <Flex flexDirection="row-reverse">
        {items.map((attendee) => (
          <Avatar
            border={`3px solid ${colors.black[4]}`}
            ml={[-12]}
            size={48}
            key={attendee.pk}
            image={attendee.photo}
            alt={attendee.name}
          />
        ))}
      </Flex>
      <Text textStyle="bodyLarge">{`${attendees.length}/200 attending`}</Text>
    </Grid>
  );
}
