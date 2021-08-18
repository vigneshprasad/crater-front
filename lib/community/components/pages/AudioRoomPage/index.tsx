import { useRouter } from "next/router";

import { Box } from "@/common/components/atoms";
import Page from "@/common/components/objects/Page";
import { useRoom } from "@/community/hooks";

import AudioRoomLayout from "../../layout/AudioRoomLayout";

const AudioRoomPage: React.FC = () => {
  const router = useRouter();
  const param = router.query.roomId as string;
  const id = parseInt(param, 10);
  const { room, loading } = useRoom({ id });

  if (loading || !room) return null;

  console.log(room);

  return (
    <Page
      seo={{ title: room.topic_detail?.name, description: room.description }}
    >
      <AudioRoomLayout>
        <Box>Hello</Box>
      </AudioRoomLayout>
    </Page>
  );
};

export default AudioRoomPage;
