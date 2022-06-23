import { useTheme } from "styled-components";

import { Box, Flex, Icon, Text } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Follower, Webinar } from "@/community/types/community";

import StreamAboutSection from "../StreamAboutSection";

interface IProps {
  stream: Webinar;
  followers?: Follower[];
  followersLoading: boolean;
  onFollow: () => void;
}

export default function PastStreamAboutSection({
  stream,
  followers,
  followersLoading,
  onFollow,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const startTime = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );

  return (
    <Box>
      <Flex pb={space.xxs} flexDirection="row" justifyContent="space-between">
        <Flex gridGap={4} alignItems="center">
          <Icon color={colors.textSecondary} icon="Calendar" size={16} />
          <Text color={colors.textSecondary} textStyle="caption">
            {startTime}
          </Text>
        </Flex>
        <Flex flexDirection="row" gridGap={space.xs}>
          <Flex justifyContent="center" alignItems="center" gridGap={6}>
            <Icon
              icon="QuestionMark"
              size={20}
              color={colors.white[0]}
              fill={true}
            />
            <Text textStyle="small" fontWeight={500}>
              Forum
            </Text>
          </Flex>

          <Flex justifyContent="center" alignItems="center" gridGap={6}>
            <Icon icon="Share" size={20} color={colors.white[0]} fill={true} />
            <Text textStyle="small" fontWeight={500}>
              Share stream
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <StreamAboutSection
        stream={stream}
        followers={followers}
        followersLoading={followersLoading}
        hideShareIcon={true}
        onFollow={onFollow}
      />
    </Box>
  );
}
