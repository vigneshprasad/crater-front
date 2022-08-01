import { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Flex, Icon, Span, Text } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Creator } from "@/creators/types/creator";
import usePastStreams from "@/stream/context/PastStreamContext";

import CreatorJourneyStatic from "../CreatorJourneyStatic";
import CreatorProfileStatusBox from "../CreatorProfileStatusBox";

type IProps = {
  creator: Creator | null;
};

export default function CreatorHubJourneyTab({ creator }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { streams: creatorPastStreams } = usePastStreams();

  const { data: creatorProfileStatus } = useSWR<{ percent: number }>(
    creator ? API_URL_CONSTANTS.user.getProfileStatus : null
  );

  return (
    <Box overflow="auto" minWidth={1000}>
      {creator && (
        <CreatorProfileStatusBox
          creator={creator}
          profileCompletedPercent={creatorProfileStatus?.percent ?? 0}
          pastStreams={creatorPastStreams}
        />
      )}

      <Box
        py={32}
        pl={32}
        pr={36}
        bg={colors.primaryDark}
        borderRadius={radii.xxxxs}
      >
        <Flex flexDirection="row" gridGap={24}>
          <Box w={450}>
            <iframe
              width="450"
              height="254"
              src="https://www.youtube.com/embed/nWqxG9srgqE"
              title="Welcome to Crater.Club"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>

          <Flex flexDirection="column" justifyContent="space-around">
            <Text textStyle="body" pb={space.s} color={colors.textTertiary}>
              We are building the biggest{" "}
              <Span color={colors.white[0]}>
                livestreaming and monetisation
              </Span>
              platform for educators and creators. This is your journey of
              building a community on Crater. As you grow, new action items will
              be unlocked.
            </Text>
            <Box
              p={space.xs}
              bg={colors.primaryLight}
              borderRadius={radii.xxxxs}
            >
              <Flex flexDirection="row" gridGap={space.xxxs} alignItems="start">
                <Icon icon="Tip" size={20} color="#FFE29B" />
                <Box>
                  <Text textStyle="body" color="#FFE29B">
                    Pro Tip:
                  </Text>
                  <Text
                    textStyle="body"
                    pt={space.xxxxs}
                    color={colors.textTertiary}
                  >
                    Completing all profile elements such as profile picture,
                    bio, channel banner, etc. will make your channel more
                    appealing to your viewers.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <CreatorJourneyStatic />
      </Box>
    </Box>
  );
}
