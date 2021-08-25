import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { User } from "next-auth";
import { getSession } from "next-auth/client";

import dynamic from "next/dynamic";

import { UserProvider } from "@/auth/context/UserContext";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import fetcher from "@/common/utils/fetcher";
import { RoomProvider } from "@/community/context/RoomContext";
import { Room } from "@/creators/types/community";

const AudioRoomPage = dynamic(
  () => import("@/community/components/pages/AudioRoomPage"),
  { ssr: false }
);

export const getServerSideProps: GetServerSideProps<{
  room: Room;
  user: User;
}> = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    const id = context.query.roomId;
    const headers = {
      Authorization: `JWT ${session.user.apiToken}`,
    };
    try {
      const room = await fetcher<Room>(
        `${API_URL_CONSTANTS.community.getAllRooms}${id}/`,
        {
          headers,
        }
      );
      const user = await fetcher<User>(API_URL_CONSTANTS.auth.getUser, {
        headers,
      });
      return {
        props: {
          room,
          user,
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

const AudioRoom: React.FC<Props> = ({ room, user }) => {
  return (
    <RoomProvider intialData={room}>
      <UserProvider initialData={user}>
        <AudioRoomPage />
      </UserProvider>
    </RoomProvider>
  );
};

export default AudioRoom;
