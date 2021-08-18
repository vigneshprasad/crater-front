import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";

import ApiClient from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import AudioRoomPage from "@/community/components/pages/AudioRoomPage";
import { RoomProvider } from "@/community/context/RoomContext";
import { Room } from "@/creators/types/community";

export const getServerSideProps: GetServerSideProps<{ room: Room }> = async (
  context
) => {
  const session = await getSession(context);
  if (session?.user) {
    const id = context.query.roomId;
    try {
      const res = await ApiClient.get<Room>(
        `${API_URL_CONSTANTS.community.getAllRooms}${id}/`,
        {
          headers: {
            Authorization: `JWT ${session.user.apiToken}`,
          },
        }
      );
      return {
        props: {
          room: res.data,
        },
      };
    } catch (err) {
      return {
        notFound: true,
      };
    }
  }

  return {
    redirect: {
      destination: "/auth",
      permanent: true,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const AudioRoom: React.FC<Props> = ({ room }) => {
  return (
    <RoomProvider intialData={room}>
      <AudioRoomPage />
    </RoomProvider>
  );
};

export default AudioRoom;
