import { useState } from "react";
import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Text,
  Grid,
  Avatar,
  Icon,
  BottomSheet,
  Shimmer,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { IconButton } from "@/common/components/atoms/v2";
import HeadingDivider from "@/common/components/objects/HeadingDivider";
import { Follower, Webinar } from "@/community/types/community";

interface IProps {
  stream?: Webinar;
  followers?: Follower[];
  followersLoading: boolean;
  onFollow: () => void;
}

export default function StreamAboutSection({
  stream,
  followers,
  followersLoading,
  onFollow,
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
  const [showAboutSheet, setShowAboutSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  if (!stream) {
    return <Box>Loading...</Box>;
  }

  const { topic_detail, host_detail } = stream;

  return (
    <>
      <Box as="section" bg={colors.primaryDark} borderRadius={radii.xxxxs}>
        <Flex
          display={["none", "flex"]}
          justifyContent="space-between"
          p={[space.xxxs, space.xxs]}
          background={colors.primaryLight}
        >
          <Text textStyle="cardHeader" color={colors.textSecondary}>
            About the stream
          </Text>
        </Flex>

        <Box px={[space.xxxs, space.xxs]} py={[space.xxxxs, space.xxs]}>
          <Text textStyle="headline5">{topic_detail.name}</Text>
          <Text
            display={["none", "block"]}
            color={colors.textSecondary}
            py={space.xxxs}
          >
            {topic_detail.description}
          </Text>
          <HeadingDivider label="Speaker" />
          <Grid
            gridTemplateColumns="max-content 1fr max-content"
            gridGap={space.xxs}
            alignItems="start"
            py={space.xxxxs}
          >
            <Avatar
              image={host_detail.photo}
              size={40}
              onClick={() => setShowAboutSheet(true)}
            />
            <Box onClick={() => setShowAboutSheet(true)}>
              <Text textStyle="body" fontWeight="700">
                {host_detail.name}
              </Text>
              <Text textStyle="body">
                {stream?.host_detail.creator_detail?.subscriber_count} Followers
              </Text>
              <Text
                display={["none", "block"]}
                py={space.xxxs}
                color={colors.textSecondary}
              >
                {host_detail.introduction}
              </Text>
            </Box>

            <Flex display={["none", "flex"]} gridGap={space.xxxs}>
              {(() => {
                if (followersLoading || !followers) {
                  return (
                    <>
                      <Shimmer h={39} w={72} borderRadius={4} />
                    </>
                  );
                }

                return (
                  <>
                    <Button
                      disabled={followers.length ? true : false}
                      label={followers.length ? "Following" : "Follow"}
                      onClick={() => onFollow()}
                    />
                  </>
                );
              })()}
              {stream.host_detail.creator_detail?.profile_detail
                .primary_url && (
                <a
                  href={
                    stream.host_detail.creator_detail?.profile_detail
                      .primary_url
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline-condensed">
                    <Flex gridGap={space.xxxs} alignItems="center">
                      <Icon icon="Linktree" size={16} />
                      <Text fontSize="inherit" color="inherit" fontWeight="500">
                        LinkTree
                      </Text>
                    </Flex>
                  </Button>
                </a>
              )}
            </Flex>

            <IconButton
              display={["grid", "none !important"]}
              icon="Share"
              onClick={() => {
                setShowShareSheet(true);
              }}
            />
          </Grid>

          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            p={space.xxxxs}
            display={["none"]}
          >
            <Text color={colors.accentLight}>
              Refer a friend and earn ₹100 🎉
            </Text>
            <Icon icon="ChevronRight" />
          </Flex>
        </Box>
      </Box>

      <BottomSheet
        heading="About the creator"
        visible={showAboutSheet}
        onClose={() => {
          setShowAboutSheet(false);
        }}
      >
        <Box my={space.xxxs} h={1} bg={colors.black[0]} />
        <Flex gridGap={space.xxs}>
          <Avatar image={host_detail.photo} size={40} />
          <Box>
            <Text textStyle="body" fontWeight="700">
              {host_detail.name}
            </Text>
            <Text textStyle="body">{followers?.length} Followers</Text>
          </Box>
        </Flex>
        <Text py={space.xxxs} color={colors.textSecondary}>
          {host_detail.introduction}
        </Text>

        <Flex gridGap={space.xxxs}>
          {(() => {
            if (followersLoading || !followers) {
              return (
                <>
                  <Shimmer h={39} w={72} borderRadius={4} />
                </>
              );
            }

            return (
              <>
                <Button
                  disabled={followers.length ? true : false}
                  label={followers.length ? "Following" : "Follow"}
                  onClick={() => onFollow()}
                />
              </>
            );
          })()}
          <Button variant="outline-condensed">
            <Flex gridGap={space.xxxs} alignItems="center">
              <Icon icon="Linktree" size={16} />
              <Text fontSize="inherit" color="inherit" fontWeight="500">
                LinkTree
              </Text>
            </Flex>
          </Button>
        </Flex>
      </BottomSheet>

      <BottomSheet
        heading="Share this stream"
        visible={showShareSheet}
        onClose={() => {
          setShowShareSheet(false);
        }}
      >
        <Grid
          gridTemplateColumns="repeat(3, 1fr)"
          py={space.xxs}
          gridGap={space.xxs}
        >
          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton buttonStyle="round-large" icon="ContentCopy" />
            <Text textStyle="body">Copy link</Text>
          </Flex>

          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              buttonStyle="round-large"
              icon="Linkedin"
              iconProps={{ fill: true }}
            />
            <Text textStyle="body">LinkedIn</Text>
          </Flex>

          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              buttonStyle="round-large"
              iconProps={{ fill: true }}
              icon="Twitter"
            />
            <Text textStyle="body">Twitter</Text>
          </Flex>

          <Flex
            flexDirection="column"
            gridGap={space.xxxs}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              buttonStyle="round-large"
              iconProps={{ fill: true }}
              icon="Whatsapp"
            />
            <Text textStyle="body">Whatsapp</Text>
          </Flex>
        </Grid>
      </BottomSheet>
    </>
  );
}
