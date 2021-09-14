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
