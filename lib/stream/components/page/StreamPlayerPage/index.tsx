import styled, { useTheme } from "styled-components";

import { Grid, Text, Box, Avatar, Link } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import ExpandingText from "@/common/components/objects/ExpandingText";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import NetworkList from "@/community/components/objects/NetworkList";
import useNetworkList from "@/community/context/NetworkListContext";
import { useWebinar } from "@/community/context/WebinarContext";
import useStreamRecording from "@/stream/context/StreamRecordingContext";

import PastStreamsList from "../../objects/PastStreamsList";

const Video = styled.video`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.xxs};
`;

export default function StreamPlayerPage(): JSX.Element {
  const { webinar, loading } = useWebinar();
  const { recording } = useStreamRecording();
  const { members, loading: membersLoading } = useNetworkList();

  const { space, colors, borders } = useTheme();

  if (!webinar || loading) return <Box>Loading...</Box>;

  const startTime = DateTime.parse(webinar?.start).toFormat("ff");

  return (
    <BaseLayout px={[space.xs, space.s]} aside={<AsideNav />} overflowY="auto">
      <Grid gridTemplateColumns={["1fr", "2fr 1fr"]} gridGap={space.xs}>
        <Box py={space.s}>
          <Video
            poster={webinar?.topic_detail?.image}
            controls
            controlsList="nodownload"
            src={recording?.recording}
          />
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
          <PastStreamsList />

          <Box h={space.xs} />

          <NetworkList
            webinar={webinar}
            members={members}
            loading={membersLoading}
          />
          <Link href={PageRoutes.community} boxProps={{ target: "_blank" }}>
            <Button variant="full-width" text="Network with Members" />
          </Link>
          <Box h={space.m} />
        </Box>
      </Grid>
    </BaseLayout>
  );
}
