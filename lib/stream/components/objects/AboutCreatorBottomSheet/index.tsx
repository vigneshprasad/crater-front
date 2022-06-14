import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Avatar,
  BottomSheet,
  Box,
  BoxProps,
  Flex,
  Icon,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { Follower, Webinar } from "@/community/types/community";

const TextBox = styled(Box)<BoxProps>`
  max-height: 300px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  ::-webkit-scrollbar-thumb {
    background-color: "#373737";
    border-radius: 4px;
  }
`;

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
        pb: space.xxxs,
        bg: colors.primaryDark,
      }}
    >
      <Box pl={space.xxxs}>
        <Flex gridGap={space.xxs} alignItems="center">
          <Avatar image={host_detail.photo} size={40} />
          <Text textStyle="body" fontWeight="700">
            {host_detail.name}
          </Text>
        </Flex>
        <TextBox maxHeight={300} overflowY="auto">
          <Text py={space.xxxs} color={colors.textSecondary}>
            {host_detail.introduction}
          </Text>
        </TextBox>

        <Flex mt={space.xxxxs} gridGap={space.xxxs}>
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
            <a
              style={{
                flex: 1,
                display: "flex",
              }}
              target="_blank"
            >
              <Button
                variant="outline-condensed"
                label="LinkTree"
                flex={1}
                prefixElement={<Icon icon="Linktree" size={16} />}
              />
            </a>
          )}
        </Flex>
      </Box>
      <Box h={space.xs} />
    </BottomSheet>
  );
}
