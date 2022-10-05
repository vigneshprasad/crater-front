export interface DyteParticpant {
  pk: number;
  dyte_meeting: number;
  auth_token: string;
  is_online: boolean;
  dyte_meeting_detail: {
    dyte_meeting_id: string;
    room_name: string;
  };
}

export enum DyteLiveStreamStatus {
  OFFLINE = "OFFLINE",
  LIVE = "LIVE",
}

export interface DyteLiveStream {
  id: number;
  dyte_meeting: number;
  status: DyteLiveStreamStatus;
  ingest_seconds: number;
  viewer_seconds: number;
  ingest_server: string;
  livestream_id: string;
  playback_url: string;
  stream_key: string;
}
