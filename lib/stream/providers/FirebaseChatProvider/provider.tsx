import axios from "axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useSWR from "swr";

import useAuth from "@/auth/context/AuthContext";
import { ENV } from "@/common/constants/global.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import firebaseApp from "@/integrations/firebase";

import { ConnectionStates, FirebaseChatContext } from "./context";
import { ChatMessage, ChatMessageConvertor, ChatMessageType } from "./types";

interface IProps {
  groupId: string | number;
  children: React.ReactNode | React.ReactNodeArray;
}

const auth = getAuth(firebaseApp);

export function FirebaseChatProvider({
  groupId,
  ...rest
}: IProps): JSX.Element {
  const { user } = useAuth();

  const groupCollectionId = useMemo(() => {
    if (ENV === "production") {
      return groupId.toString();
    }
    return `${ENV}_${groupId}`;
  }, [groupId]);

  const messagesQuery = useMemo(() => {
    return query(
      collection(
        getFirestore(firebaseApp),
        `group/${groupCollectionId}/messages`
      ).withConverter(ChatMessageConvertor),
      where("group", "==", groupCollectionId)
    );
  }, [groupCollectionId]);

  const { data: tokenResponse } = useSWR<{ token: string }>(
    user ? API_URL_CONSTANTS.firebase.getFirebaseToken : null
  );
  const [firebaseUser] = useAuthState(auth);
  const [messages] = useCollectionData(messagesQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [readyState, setReadyState] = useState(ConnectionStates.UNKNOWN);

  useEffect(() => {
    if (firebaseUser && firebaseUser.uid) {
      setReadyState(ConnectionStates.CONNECTED);
    }
  }, [firebaseUser, setReadyState]);

  const postMessage = useCallback(
    async (message: Partial<ChatMessage>) => {
      if (firebaseUser) {
        const data: Partial<ChatMessage> = {
          ...message,
          group: groupCollectionId,
          ...(!message.display_name && { sender: firebaseUser.uid }),
          type: ChatMessageType.TEXT,
        };

        try {
          await axios.post(API_URL_CONSTANTS.firebase.postChatMessage, {
            ...data,
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [firebaseUser, groupCollectionId]
  );

  const postSticker = useCallback(
    async (message: Partial<ChatMessage>) => {
      if (firebaseUser) {
        const data: Partial<ChatMessage> = {
          ...message,
          group: groupCollectionId,
          sender: firebaseUser.uid,
          type: ChatMessageType.STICKER,
        };

        try {
          await axios.post(API_URL_CONSTANTS.firebase.postChatMessage, {
            ...data,
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [firebaseUser, groupCollectionId]
  );

  useEffect(() => {
    const token = tokenResponse?.token;

    if (!firebaseUser && token) {
      const authenticate = async (token: string): Promise<void> => {
        await signInWithCustomToken(auth, token);
      };

      authenticate(token);
    }
  }, [tokenResponse, firebaseUser]);

  const value = useMemo(
    () => ({
      readyState,
      messages:
        messages?.sort((x, y) => {
          return y.created_at.seconds - x.created_at.seconds;
        }) ?? [],
      postMessage,
      postSticker,
    }),
    [readyState, messages, postMessage, postSticker]
  );

  return <FirebaseChatContext.Provider value={value} {...rest} />;
}
