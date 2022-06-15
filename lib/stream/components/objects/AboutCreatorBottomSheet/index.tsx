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
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import { Follower, Webinar } from "@/community/types/community";

const TextBox = styled(Box)<BoxProps>`
  max-height: 300px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
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
      px={0}
      boxProps={{
        px: space.xxxs,
        pt: space.xxxs,
        pb: space.xxxs,
        bg: colors.primaryDark,
      }}
    >
      <Flex gridGap={space.xxs} alignItems="center" px={space.xxxs}>
        {host_detail.creator_detail?.slug && (
          <Link
            href={PageRoutes.creatorProfile(host_detail.creator_detail.slug)}
            boxProps={{ target: "_blank" }}
          >
            <Avatar image={host_detail.photo} size={40} />
          </Link>
        )}
        <Text textStyle="body" fontWeight="700">
          {host_detail.name}
        </Text>
      </Flex>
      <TextBox px={space.xxxs} maxHeight={300} overflowY="auto">
        <Text py={space.xxxs} color={colors.textSecondary}>
          {host_detail.introduction}
        </Text>
      </TextBox>

      <Flex mt={space.xxxxs} px={space.xxxs} gridGap={space.xxxs}>
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
            href={stream.host_profile_details.primary_url}
            style={{
              flex: 1,
              display: "flex",
            }}
            target="_blank"
            rel="noreferrer"
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
      <Box h={space.xs} />
    </BottomSheet>
  );
}
