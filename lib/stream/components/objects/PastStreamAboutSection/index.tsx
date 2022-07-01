import { useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Avatar,
  BottomSheet,
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { Follower, Webinar } from "@/community/types/community";
import { StreamQuestion } from "@/stream/types/stream";

import AboutCreatorBottomSheet from "../AboutCreatorBottomSheet";
import RsvpQuestionPanel from "../RsvpQuestionPanel";
import ShareStreamBottomSheet from "../ShareStreamBottomSheet";
import ShareStreamModal from "../ShareStreamModal";
import StreamAboutSection from "../StreamAboutSection";
import StreamShareSection from "../StreamShareSection";

interface IProps {
  stream: Webinar;
  followers?: Follower[];
  followersLoading: boolean;
  questions?: StreamQuestion[];
  questionsLoading: boolean;
  onFollow: () => void;
  scrollToForum: () => void;
  postQuestion: (question: string) => Promise<void>;
  postQuestionUpvote: (question: number) => void;
}

export default function PastStreamAboutSection({
  stream,
  followers,
  followersLoading,
  questions,
  questionsLoading,
  onFollow,
  scrollToForum,
  postQuestion,
  postQuestionUpvote,
}: IProps): JSX.Element | null {
  const { space, colors, breakpoints } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showAboutSheet, setShowAboutSheet] = useState(false);
  const { user } = useAuth();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { start, topic_detail, host_detail } = stream;
  const startTime = DateTime.parse_with_milliseconds(start).toFormat(
    DateTime.DEFAULT_FORMAT
  );
  const isFollower = followers?.length && followers[0].notify === true;

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <Box>
        <Text px={space.xxxs} textStyle="headline5">
          {topic_detail.name}
        </Text>
        <Flex px={space.xxxs} py={space.xxxs} gridGap={4} alignItems="center">
          <Icon color="#F6F6F6" icon="Calendar" size={16} />
          <Text color="#F6F6F6" textStyle="caption" lineHeight="1.8rem">
            {startTime}
          </Text>
        </Flex>
        <Grid gridAutoFlow="column" gridTemplateColumns="1fr 1fr">
          <RsvpQuestionPanel
            questions={questions}
            loading={questionsLoading}
            host={stream.host}
            postQuestion={postQuestion}
            postQuestionUpvote={postQuestionUpvote}
          />
          <Flex
            px={28}
            py={space.xxxs}
            justifyContent="center"
            alignItems="center"
            gridGap={6}
            bg={colors.primaryDark}
            borderRight={`1px solid ${colors.primaryLight}`}
            onClick={() => setShowShareSheet(true)}
          >
            <Icon icon="Share" size={20} color={colors.white[0]} fill={true} />
            <Text textStyle="small" fontWeight={500}>
              Share stream
            </Text>
          </Flex>

          {user ? (
            <ShareStreamBottomSheet
              stream={stream}
              visible={showShareSheet}
              onClose={() => {
                setShowShareSheet(false);
              }}
            />
          ) : (
            <BottomSheet
              px={0}
              heading="Share stream"
              bg={colors.primaryDark}
              visible={showShareSheet}
              boxProps={{
                px: space.xxxs,
                pt: space.xxxs,
                pb: space.xxxxxs,
                bg: colors.primaryDark,
              }}
              onClose={() => {
                setShowShareSheet(false);
              }}
            >
              <StreamShareSection stream={stream} />
            </BottomSheet>
          )}
        </Grid>

        <AboutCreatorBottomSheet
          stream={stream}
          visible={showAboutSheet}
          onClose={() => setShowAboutSheet(false)}
          followers={followers}
          followersLoading={followersLoading}
          onFollow={onFollow}
        />

        <Grid
          px={space.xxxs}
          py={space.xxs}
          gridTemplateColumns="max-content max-content 1fr"
          gridGap={space.xxs}
          alignItems={["center", "start"]}
        >
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
          <Flex justifySelf={["start", "end"]} gridGap={space.xxxxxs}>
            {user &&
              user.pk !== host_detail.pk &&
              (() => {
                if (followersLoading || !followers) {
                  return (
                    <>
                      <Shimmer
                        justifySelf={["start", "end"]}
                        h={[30, 38]}
                        w={72}
                        borderRadius={4}
                      />
                    </>
                  );
                }

                return (
                  <>
                    <Button
                      h="auto"
                      variant="text"
                      label={isFollower ? "Following" : "Follow"}
                      disabled={isFollower ? true : false}
                      onClick={() => onFollow()}
                    />
                  </>
                );
              })()}

            <IconButton
              display={["flex", "none"]}
              w={12}
              h={30}
              icon="ChevronDown"
              iconProps={{
                color: "accentLight",
                size: 20,
              }}
              onClick={() => {
                if (isMobile) {
                  setShowAboutSheet(true);
                }
              }}
            />
          </Flex>
        </Grid>
        <Box borderBottom={`1px solid ${colors.primaryLight}`} />
      </Box>
    );
  }

  return (
    <Box>
      <ShareStreamModal
        stream={stream}
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <Flex pb={space.xxs} flexDirection="row" justifyContent="space-between">
        <Flex gridGap={4} alignItems="center">
          <Icon color="#F6F6F6" icon="Calendar" size={16} />
          <Text color="#F6F6F6" textStyle="caption" lineHeight="1.8rem">
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
