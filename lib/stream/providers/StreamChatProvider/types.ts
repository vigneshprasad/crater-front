export interface IChatRoomJoinResponse {
  message: string;
  room: string;
  viewerCount: number;
}

export interface IChatRoomUserJoinedResponse {
  viewerCount: number;
  socketId: string;
}
