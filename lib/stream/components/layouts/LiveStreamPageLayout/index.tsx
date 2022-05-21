import useAuth from "@/auth/context/AuthContext";
import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";

import LiveStreamPanel from "../../objects/LiveStreamPanel";
import StreamViewerCount from "../../objects/StreamViewerCount";
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
  const { profile } = useAuth();
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
            {(() => {
              if (!profile) return null;

              const isAdmin = profile.groups.filter(
                (group) => group.name === "livestream_chat_admin"
              )[0];

              if (isAdmin) {
                return <StreamViewerCount />;
              }
              return null;
            })()}
          </Box>
          {streamDetail}
        </Box>

        <LiveStreamPanel initial="chat" />
      </Grid>
    </BaseLayout>
  );
}
