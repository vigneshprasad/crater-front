import { createContext } from "react";

import { ChatMessage } from "./types";

export enum ConnectionStates {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  UNKNOWN = "unknown",
}

export interface IFirebaseChatState {
  readyState: ConnectionStates;
  messages: ChatMessage[];
  postMessage: (message: Partial<ChatMessage>) => void;
  postSticker: (message: Partial<ChatMessage>) => void;
}

export const FirebaseChatContext = createContext({} as IFirebaseChatState);
