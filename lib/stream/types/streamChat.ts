export interface ChatMessage {
  id: number;
  message: string;
  group: number;
  sender: string;
  display_name?: string;
  sender_detail: {
    pk: string;
    name: string;
    email: string;
  };
}
