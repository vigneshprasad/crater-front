import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Flex, Icon, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import DateTime from "@/common/utils/datetime/DateTime";
import { Follower, Webinar } from "@/community/types/community";

import ShareStreamModal from "../ShareStreamModal";
import StreamAboutSection from "../StreamAboutSection";

interface IProps {
  stream: Webinar;
  followers?: Follower[];
  followersLoading: boolean;
  onFollow: () => void;
  scrollToForum: () => void;
}

export default function PastStreamAboutSection({
  stream,
  followers,
  followersLoading,
  onFollow,
  scrollToForum,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);

  const startTime = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );

  return (
    <Box>
      <ShareStreamModal
        stream={stream}
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <Flex pb={space.xxs} flexDirection="row" justifyContent="space-between">
        <Flex gridGap={4} alignItems="center">
          <Icon color={colors.textSecondary} icon="Calendar" size={16} />
          <Text color={colors.textSecondary} textStyle="caption">
            {startTime}
          </Text>
        </Flex>
        <Flex flexDirection="row" gridGap={space.xs}>
          <Button
            variant="text"
            label="Forum"
            textProps={{
              color: colors.textPrimary,
            }}
            prefixElement={
              <Icon
                icon="QuestionMark"
                size={20}
                color={colors.white[0]}
                fill={true}
              />
            }
            onClick={() => scrollToForum()}
          />

          <Button
            variant="text"
            label="Share stream"
            textProps={{
              color: colors.textPrimary,
            }}
            prefixElement={
              <Icon
                icon="Share"
                size={20}
                color={colors.white[0]}
                fill={true}
              />
            }
            onClick={() => setShowShareModal(true)}
          />
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
