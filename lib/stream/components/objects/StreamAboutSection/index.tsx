import { useTheme } from "styled-components";

import { Box, Flex, Text, Grid, Avatar, Icon } from "@/common/components/atoms";
import HeadingDivider from "@/common/components/objects/HeadingDivider";
import DateTime from "@/common/utils/datetime/DateTime";
import { Follower, Webinar } from "@/community/types/community";

interface IProps {
  stream?: Webinar;
  followers?: Follower[];
}

export default function StreamAboutSection({
  stream,
  followers,
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();

  if (!stream) {
    return <Box>Loading...</Box>;
  }

  const { topic_detail, host_detail, start } = stream;

  const timeDisplay = DateTime.parse_with_milliseconds(start).toFormat(
    DateTime.DEFAULT_FORMAT
  );

  return (
    <Box as="section" bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Flex
        justifyContent="space-between"
        p={space.xxs}
        background={colors.primaryLight}
      >
        <Text textStyle="cardHeader" color={colors.textSecondary}>
          About the stream
        </Text>

        <Flex gridGap={space.xxxxs}>
          <Icon icon="Calendar" size={16} />
          <Text textStyle="small" fontWeight="600">
            {timeDisplay}
          </Text>
        </Flex>
      </Flex>
      <Box p={space.xxs}>
        <Text textStyle="headline5">{topic_detail.name}</Text>
        <Text color={colors.textSecondary} py={space.xxxs}>
          {topic_detail.description}
        </Text>
        <HeadingDivider label="Speaker" />
        <Grid
          gridTemplateColumns="max-content 1fr max-content"
          gridGap={space.xxs}
        >
          <Avatar image={host_detail.photo} size={40} />
          <Box>
            <Text textStyle="body" fontWeight="700">
              {host_detail.name}
            </Text>
            <Text textStyle="body">{followers?.length} Followers</Text>
            <Text py={space.xxxs} color={colors.textSecondary}>
              {host_detail.introduction}
            </Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
