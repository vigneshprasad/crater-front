import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Avatar,
  BottomSheet,
  Box,
  Flex,
  Icon,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { Follower, Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  visible: boolean;
  onClose: () => void;
  followers?: Follower[];
  followersLoading: boolean;
  onFollow: () => void;
}

export default function AboutCreatorBottomSheet({
  stream,
  visible,
  onClose,
  followers,
  followersLoading,
  onFollow,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const { host_detail } = stream;

  return (
    <BottomSheet
      heading="About the creator"
      bg={colors.primaryDark}
      visible={visible}
      onClose={onClose}
      boxProps={{
        px: space.xxxs,
        pt: space.xxxs,
        pb: space.xxxxxs,
        bg: colors.primaryDark,
      }}
    >
      <Box my={space.xxxs} h={1} bg={colors.black[0]} />
      <Flex gridGap={space.xxs} alignItems="center">
        <Avatar image={host_detail.photo} size={40} />
        <Box>
          <Text textStyle="body" fontWeight="700">
            {host_detail.name}
          </Text>
          {user?.pk === stream.host_detail.pk && (
            <Text textStyle="body">
              {stream.host_detail.creator_detail?.subscriber_count} Followers
            </Text>
          )}
        </Box>
      </Flex>
      <Text py={space.xxxs} color={colors.textSecondary}>
        {host_detail.introduction}
      </Text>

      <Flex gridGap={space.xxxs}>
        {(() => {
          if (!user) {
            return (
              <Button
                flex="1"
                w="100%"
                textAlign="center"
                label="Login"
                onClick={openModal}
              />
            );
          }

          if (followersLoading || !followers) {
            return (
              <>
                <Shimmer flex="1" h={39} w={72} borderRadius={4} />
              </>
            );
          }

          const isFollower = followers?.[0]?.notify === true;

          return (
            <>
              <Button
                flex="1"
                w="100%"
                textAlign="center"
                disabled={isFollower ? true : false}
                label={isFollower ? "Following" : "Follow"}
                onClick={onFollow}
              />
            </>
          );
        })()}
        {stream.host_profile_details?.primary_url && (
          <a style={{ flex: 1, display: "flex" }} target="_blank">
            <Button variant="outline-condensed" flex="1">
              <Flex gridGap={space.xxxs} alignItems="center">
                <Icon icon="Linktree" size={16} />
                <Text
                  textAlign="center"
                  fontSize="inherit"
                  color="inherit"
                  fontWeight="inherit"
                >
                  LinkTree
                </Text>
              </Flex>
            </Button>
          </a>
        )}
      </Flex>
      <Box h={space.xs} />
    </BottomSheet>
  );
}
