import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/community/types/community";

interface IPastStreamState {
  streams?: Webinar[];
  error?: unknown;
  loading: boolean;
}

export const PastStreamContext = createContext({} as IPastStreamState);

type IProviderProps = PropsWithChildren<{
  initial?: Webinar[];
}>;

export function PastStreamProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: streams, error } = useSWR<Webinar[]>(
    API_URL_CONSTANTS.groups.getPastWebinars,
    { initialData: initial }
  );

  const value = useMemo(
    () => ({ streams, error, loading: !streams && !error }),
    [streams, error]
  );

  return <PastStreamContext.Provider value={value} {...rest} />;
}

export default function usePastStreams(): IPastStreamState {
  const context = useContext(PastStreamContext);

  if (!context) {
    throw new Error("You need to wrap PastStreamProvider.");
  }

  return context;
}
