import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { StreamRecording } from "../types/stream";

interface IStreamRecordingState {
  recording?: StreamRecording;
  error?: unknown;
  loading: boolean;
}

export const StreamRecordingContext = createContext(
  {} as IStreamRecordingState
);

type IProviderProps = PropsWithChildren<{
  id: string | number;
  initial?: StreamRecording;
}>;

export function StreamRecordingProvider({
  id,
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: recording, error } = useSWR(
    API_URL_CONSTANTS.groups.retrieveStreamRecording(id),
    { initialData: initial }
  );

  const value = useMemo(
    () => ({
      recording,
      error,
      loading: !recording && !error,
    }),
    [recording, error]
  );

  return <StreamRecordingContext.Provider value={value} {...rest} />;
}

export default function useStreamRecording(): IStreamRecordingState {
  const context = useContext(StreamRecordingContext);

  if (!context) {
    throw new Error("You need to wrap StreamRecordingProvider.");
  }

  return context;
}
