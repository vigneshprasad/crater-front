import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";

import LiveStreamPanel from "../../objects/LiveStreamPanel";
import UpcomingStreamsWidget from "../../objects/UpcomingStreamsWidget";

interface IProps {
  videoPlayer: React.ReactNode;
  streamDetail: React.ReactNode;
  modal?: React.ReactNode;
}

export default function LiveStreamPageLayout({
  videoPlayer,
  streamDetail,
  modal,
}: IProps): JSX.Element {
  return (
    <BaseLayout aside={<AsideNav />} overflowY={["auto", "hidden"]}>
      {modal}
      <Grid
        gridTemplateColumns={["1fr", "1fr 400px"]}
        h="100%"
        gridTemplateRows={["min-content 1fr", "1fr"]}
      >
        <Box overflowY={["hidden", "auto"]}>
          <Box position="relative" pt="56.25%">
            {videoPlayer}
            <UpcomingStreamsWidget />
          </Box>
          {streamDetail}
        </Box>

        <LiveStreamPanel initial="chat" />
      </Grid>
    </BaseLayout>
  );
}
