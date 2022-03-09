import styled, { useTheme } from "styled-components";

import { Grid, Text, Box, Avatar } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import ExpandingText from "@/common/components/objects/ExpandingText";
import DateTime from "@/common/utils/datetime/DateTime";
import { useWebinar } from "@/community/context/WebinarContext";
import useStreamRecording from "@/stream/context/StreamRecordingContext";

import PastStreamsList from "../../objects/PastStreamsList";

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.xxs}px;
`;

export default function StreamPlayerPage(): JSX.Element {
  const { webinar, loading } = useWebinar();
  const { recording } = useStreamRecording();

  const { space, colors, borders } = useTheme();

  if (!webinar || loading) return <Box>Loading...</Box>;

  const startTime = DateTime.parse(webinar?.start).toFormat("ff");

  return (
    <BaseLayout px={[space.xs, space.s]} aside={<AsideNav />} overflowY="auto">
      <Grid gridTemplateColumns={["1fr", "2fr 1fr"]} gridGap={space.xs}>
        <Box py={space.s}>
          <Box position="relative" pt="56.25%">
            <Video
              poster={webinar?.topic_detail?.image}
              controls
              controlsList="nodownload"
              src={recording?.recording}
            />
          </Box>

          <Box py={space.xxs}>
            <Text textStyle="headline5">{webinar?.topic_detail?.name}</Text>
            <Text color={colors.slate}>{startTime}</Text>
          </Box>

          <Grid
            py={space.xxs}
            borderTop={`2px solid ${borders.main}`}
            alignItems="start"
            gridTemplateColumns="max-content 1fr"
          >
            <Avatar size={52} image={webinar?.host_profile_details?.photo} />
            <Box px={space.xxs}>
              <Text textStyle="title">{webinar?.host_detail?.name}</Text>
              <ExpandingText maxLines={1}>
                {webinar?.host_detail?.introduction}
              </ExpandingText>
            </Box>
          </Grid>
        </Box>

        <Box py={space.s}>
          <PastStreamsList displayedPastStreamId={webinar.id} />
          <Box h={space.xs} />
        </Box>
      </Grid>
    </BaseLayout>
  );
}
