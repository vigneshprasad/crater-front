import {
  createContext,
  useMemo,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { Reward } from "@/tokens/types/token";

interface ILiveStreamPageState {
  activeReward?: Reward;
  tokenModalVisible: boolean;
  setTokenModalVisible: Dispatch<SetStateAction<boolean>>;
  setActiveReward: Dispatch<SetStateAction<Reward | undefined>>;
}

export const LiveStreamPageContext = createContext<ILiveStreamPageState>(
  {} as ILiveStreamPageState
);

export function LiveStreamPageProvider({
  children,
}: {
  children: React.ReactNode;
  activeReward?: Reward;
}): JSX.Element {
  const [activeReward, setActiveReward] = useState<Reward | undefined>(
    undefined
  );
  const [tokenModalVisible, setTokenModalVisible] = useState(false);

  const value = useMemo(
    () => ({
      tokenModalVisible,
      activeReward,
      setTokenModalVisible,
      setActiveReward,
    }),
    [tokenModalVisible, activeReward, setTokenModalVisible, setActiveReward]
  );

  return (
    <LiveStreamPageContext.Provider value={value}>
      {children}
    </LiveStreamPageContext.Provider>
  );
}

export default function useLiveStreamPageContext(): ILiveStreamPageState {
  const context = useContext(LiveStreamPageContext);

  if (context === undefined) {
    throw new Error(
      "useLiveStreamPageContext must be used within a LiveStreamPageProvider"
    );
  }

  return context;
}
